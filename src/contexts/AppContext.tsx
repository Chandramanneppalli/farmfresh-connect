import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'farmer' | 'consumer' | 'admin' | null;

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  userName: string;
  setUserName: (name: string) => void;
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const meta = currentSession.user.user_metadata;
          setUserName(meta?.full_name || currentSession.user.email?.split('@')[0] || 'User');

          // Use setTimeout to avoid Supabase auth deadlock
          setTimeout(async () => {
            if (!mounted) return;
            try {
              const { data: roles } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', currentSession.user.id)
                .limit(1);

              if (!mounted) return;
              if (roles && roles.length > 0) {
                setRole(roles[0].role as UserRole);
              } else {
                setRole((meta?.role as UserRole) || 'consumer');
              }
            } catch (error) {
              console.error('Error fetching role:', error);
              if (mounted) setRole((meta?.role as UserRole) || 'consumer');
            }
            if (mounted) setLoading(false);
          }, 0);
        } else {
          setRole(null);
          setUserName('');
          setLoading(false);
        }
      }
    );

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      if (!mounted) return;
      // If no session and still loading, force loading to false
      if (!existingSession) {
        setLoading(false);
      }
    });

    // Safety timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 5000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole(null);
    setUserName('');
  };

  const isAuthenticated = !!session;

  return (
    <AppContext.Provider value={{ role, setRole, isAuthenticated, userName, setUserName, user, session, loading, signOut }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

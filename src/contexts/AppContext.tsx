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
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const meta = session.user.user_metadata;
          setUserName(meta?.full_name || session.user.email?.split('@')[0] || 'User');

          // Fetch role from user_roles table
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .limit(1);

          if (roles && roles.length > 0) {
            setRole(roles[0].role as UserRole);
          } else {
            // Fallback to metadata
            setRole((meta?.role as UserRole) || 'consumer');
          }
        } else {
          setRole(null);
          setUserName('');
        }
        setLoading(false);
      }
    );

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) setLoading(false);
      // onAuthStateChange will handle the rest
    });

    return () => subscription.unsubscribe();
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

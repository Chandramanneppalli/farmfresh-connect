import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'farmer' | 'consumer' | 'admin' | null;

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <AppContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated, userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

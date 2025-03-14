'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Patient } from '@/types';
import { currentPatient } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Patient | null;
  login: (patientId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Patient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in (from localStorage in a real app)
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        setUser(currentPatient); // In a real app, would fetch user data
        setIsAuthenticated(true);
      }
    };

    // Only execute in browser environment
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, []);

  const login = async (patientId: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to verify credentials
    // For demo, we'll accept any non-empty values and use our mock data
    if (patientId && password) {
      setUser(currentPatient);
      setIsAuthenticated(true);
      
      // Store auth state (in a real app, would store a token)
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
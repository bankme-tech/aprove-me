'use client';

import { api } from "@/api/api";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  updateSession: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers['authorization'] = `Bearer ${token}`;
      setToken(token);
    }

    setIsLoading(false);
  }, [])

  const updateSession = (token: string) => {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
    setToken(token);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, updateSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

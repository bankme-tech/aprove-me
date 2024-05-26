'use client';

import { api } from "@/api/axios";
import { useRouter } from "next/navigation";

import { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;

}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {

    const checkToken = async () => {

      const storageToken = localStorage.getItem('token');
      if (storageToken) {
        try {
          await api.post('auth/validate-token', { token: storageToken })
          api.defaults.headers['authorization'] = `Bearer ${storageToken}`;
          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setIsLoading(false);
          localStorage.removeItem('token');
        }
      } else setIsAuthenticated(false);
      setIsLoading(false);
    }
    checkToken();

  }, [])

  const Login = useCallback(async (email: string, password: string) => {
    const respAuth = await api.post('/auth', { email, password });


    if (respAuth instanceof Error) {
      return respAuth.message;
    }

    localStorage.setItem('token', respAuth.data.token);
    api.defaults.headers['authorization'] = `Bearer ${respAuth.data.token}`;
    setIsAuthenticated(true);

  }, [])

  const Logout = useCallback(() => {
    localStorage.removeItem('token');
    api.defaults.headers['authorization'] = '';
    setIsAuthenticated(false);
    router.push('/signIn');
  }, [router])

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, login: Login, logout: Logout }}>
      {children}
    </AuthContext.Provider>
  )
}

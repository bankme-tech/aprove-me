'use client';
import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';

type IAuthContext = {
  isLogged: boolean;
  isLoading: boolean;
  username: string | null;
  updateUsername: (username: string) => void;
  updateSessionToken: (token: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('@approve-me:token');
    const usernameFromStorage = localStorage.getItem('@approve-me:username');

    if (tokenFromStorage) {
      api.defaults.headers.authorization = tokenFromStorage;
      setToken(tokenFromStorage);
    }

    if (usernameFromStorage) {
      setUsername(usernameFromStorage);
    }

    setLoading(false);
  }, []);

  const updateSessionToken = (token: string) => {
    setToken(token);
    api.defaults.headers.authorization = token;
    localStorage.setItem('@approve-me:token', token);
  };

  const updateUsername = (username: string) => {
    setUsername(username);

    localStorage.setItem('@approve-me:username', username);
  };

  const isLogged = !!token;

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isLoading,
        username,
        updateUsername,
        updateSessionToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

'use client';
import React, { useState } from 'react';
import { api } from '@/services/api';

type IAuthContext = {
  isLogged: boolean;
  username: string | null;
  updateUsername: (username: string) => void;
  updateSessionToken: (token: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string | null>(() => {
    const fromStorage = localStorage.getItem('@approve-me:username');

    return fromStorage;
  });
  const [token, setToken] = useState<string | null>(() => {
    const tokenFromStorage = localStorage.getItem('@approve-me:token');

    if (tokenFromStorage) {
      api.defaults.headers.authorization = token;
    }

    return tokenFromStorage;
  });

  const updateSessionToken = (token: string) => {
    setToken(token);
    api.defaults.headers.authorization = token;
    localStorage.setItem('@approve-me:token', token);
  };

  const updateUsername = (username: string) => {
    setUsername(username);

    localStorage.setItem('@approve-me:username', username);
  };

  const isLogged = !!username;

  return (
    <AuthContext.Provider
      value={{
        isLogged,
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

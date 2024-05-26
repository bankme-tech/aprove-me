'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';

import { AppRoutes } from '@/constants/app-routes';
import type { UserModel } from '@/services/models/user-model';

export type AppContextProps = {
  isLeftBarOpen: boolean;
  setIsLeftBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
  logout: () => void;
};

export const AppContext = React.createContext({} as AppContextProps);

interface Props {
  children?: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<UserModel | null>(null);
  const [isLeftBarOpen, setIsLeftBarOpen] = React.useState<boolean>(true);
  const router = useRouter();

  const logout = () => {
    setUser(null);
    router.push(AppRoutes.auth.login);
    Cookies.remove('accessToken');
  };

  const value = {
    user,
    setUser,
    isLeftBarOpen,
    setIsLeftBarOpen,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

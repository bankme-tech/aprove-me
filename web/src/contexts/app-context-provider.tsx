'use client';

import React from 'react';

import type { UserModel } from '@/services/models/user-model';

export type AppContextProps = {
  isLeftBarOpen: boolean;
  setIsLeftBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
};

export const AppContext = React.createContext({} as AppContextProps);

interface Props {
  children?: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<UserModel | null>(null);
  const [isLeftBarOpen, setIsLeftBarOpen] = React.useState<boolean>(true);

  const value = {
    user,
    setUser,
    isLeftBarOpen,
    setIsLeftBarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

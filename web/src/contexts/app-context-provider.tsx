'use client';

import React from 'react';

export type AppContextProps = {
  isLeftBarOpen: boolean;
  setIsLeftBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = React.createContext({} as AppContextProps);

interface Props {
  children?: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [isLeftBarOpen, setIsLeftBarOpen] = React.useState<boolean>(true);

  const value = {
    isLeftBarOpen,
    setIsLeftBarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

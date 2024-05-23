'use client';

import React from 'react';

import { AppContext } from '@/contexts/app-context-provider';

export const useAppContext = () => {
  const value = React.useContext(AppContext);

  if (!value) {
    throw new Error('AppContext should be used inside AppContextProvider');
  }

  return value;
};

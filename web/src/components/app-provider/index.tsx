'use client';

import React from 'react';
import { Toaster } from 'sonner';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { AppContextProvider } from '@/contexts/app-context-provider';

interface Props {
  children?: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => (
  <AppContextProvider>
    <ApiContextProvider>
      <Toaster richColors theme="dark" />
      {children}
    </ApiContextProvider>
  </AppContextProvider>
);

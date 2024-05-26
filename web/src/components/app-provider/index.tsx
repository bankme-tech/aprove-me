'use client';

import React from 'react';
import { Toaster } from 'sonner';

import { ApiContextProvider } from '@/contexts/api-context-provider';
import { AppContextProvider } from '@/contexts/app-context-provider';
import { BankmeClient } from '@/services/bankme-client/clients/bankme-client';
import { AxiosAssignorClient } from '@/services/bankme-client/impl/axios/axios-assignors-client';
import { AxiosAuthClient } from '@/services/bankme-client/impl/axios/axios-auth-client';
import { AxiosPayablesClient } from '@/services/bankme-client/impl/axios/axios-payables-client';
import { AxiosUsersClient } from '@/services/bankme-client/impl/axios/axios-users-client';

interface Props {
  children?: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const client = new BankmeClient({
    auth: new AxiosAuthClient(),
    assignors: new AxiosAssignorClient(),
    payables: new AxiosPayablesClient(),
    users: new AxiosUsersClient(),
  });

  return (
    <AppContextProvider>
      <ApiContextProvider api={client}>
        <Toaster richColors theme="dark" />
        {children}
      </ApiContextProvider>
    </AppContextProvider>
  );
};

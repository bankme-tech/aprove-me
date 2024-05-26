'use client';

import React from 'react';

import type { BankmeClient } from '@/services/bankme-client/clients/bankme-client';

export type AppContextProps = {
  api: BankmeClient;
};

export const ApiContext = React.createContext({} as AppContextProps);

interface Props {
  children?: React.ReactNode;
  api: BankmeClient;
}

export const ApiContextProvider: React.FC<Props> = ({
  children,
  api: _api,
}) => {
  const [api, setApi] = React.useState<BankmeClient>(_api);

  const value = {
    api,
    setApi,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

'use client';

import React from 'react';

import { ApiContext } from '@/contexts/api-context-provider';

export const useAPI = () => {
  const value = React.useContext(ApiContext);

  if (!value) {
    throw new Error('ApIContext should be used inside ApiContextProvider');
  }

  return value;
};

'use client';

import React from 'react';

import { useAppContext } from '@/hooks/use-app-context';
import { cn } from '@/utils/funcitons';

interface Props {
  children?: React.ReactNode;
}

export const ContentWrapper: React.FC<Props> = ({ children }) => {
  const { isLeftBarOpen } = useAppContext();

  return (
    <div className={cn(isLeftBarOpen ? 'pl-64' : 'pl-0', 'transition-all')}>
      {children}
    </div>
  );
};

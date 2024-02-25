'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth'

export function withAuth(Component: any) {
  return function withAuthFn(props: any) {
    const {  isLoading } = useAuth();

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  };
}

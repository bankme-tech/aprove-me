'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation';

export function withAuth(Component: any) {
  return function withAuthFn(props: any) {
    const { isLoading } = useAuth();

    if (isLoading) {
      redirect('/login');
    }

    return <Component {...props} />;
  };
}

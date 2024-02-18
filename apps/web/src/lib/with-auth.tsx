'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component: any) {
  return function withAuthFn(props: any) {
    const { isLogged, isLoading } = useAuth();

    useEffect(() => {
      if (!isLogged && !isLoading) {
        redirect('/sign/in');
      }
    }, [isLoading]);

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  };
}

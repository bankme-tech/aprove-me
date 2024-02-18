'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component: any) {
  return function withAuthFn(props: any) {
    const { isLogged } = useAuth();

    useEffect(() => {
      if (!isLogged) {
        redirect('/sign/in');
      }
    }, []);

    if (!isLogged) {
      return null;
    }

    return <Component {...props} />;
  };
}

'use client';

import React from 'react';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export function withAuth(Component: any) {
  return function WithAuthFn(props: any) {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        redirect('/auth');
      }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  };
}

'use client'

import { redirect } from "next/navigation";
import { useAuth } from "./hooks/UseAuth";
import { useEffect } from "react";

export function WithAuth(Component: any) {
  return function WithAuthFn(props: any) {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isAuthenticated && !isLoading) redirect('/signIn');
    }, [isLoading, isAuthenticated]);

    return <Component {...props} />;
  }
}

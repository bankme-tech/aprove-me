"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function WithAuth(Component: any) {
  return function WithAuthFn(props: any) {
    const { isLogged, isLoading } = useAuth();

    useEffect(() => {
      if (!isLogged && !isLoading) {
        redirect("/");
      }
    }, [isLoading, isLogged]);

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  };
}

'use client';
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient()

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {children}
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
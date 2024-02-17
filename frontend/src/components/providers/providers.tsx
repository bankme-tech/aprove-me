import { queryClient } from '@/lib/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from '../ui';
import { ThemeProvider } from './theme';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="aproveme-theme" defaultTheme="system">
        {children}
      </ThemeProvider>
      <Toaster richColors />
    </QueryClientProvider>
  );
};

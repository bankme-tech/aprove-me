import React from 'react';
import { Inter as FontSans } from 'next/font/google';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Tech Test | bankme.tech</title>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased bg-slate-50',
          fontSans.variable,
        )}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

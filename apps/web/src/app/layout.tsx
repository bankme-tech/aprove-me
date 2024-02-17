import React from 'react';
import { Inter as FontSans } from 'next/font/google';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';

export const fontSans = FontSans({
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
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased bg-slate-50',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}

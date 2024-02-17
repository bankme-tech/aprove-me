import { ReactNode } from 'react';
import { Header } from '../header';
import { Outlet } from 'react-router-dom';

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <main className="mx-auto max-w-6xl px-4 text-foreground">
      <Header />
      {children ? children : <Outlet />}
    </main>
  );
};

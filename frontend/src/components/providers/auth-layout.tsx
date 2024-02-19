import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../header';
import { useAuth } from './auth-context';

export const AuthLayout = ({ children }: { children?: ReactNode }) => {
  const { usertoken } = useAuth();

  if (!usertoken) {
    return <Navigate to={'/'} />;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 text-foreground">
      <Header />
      {children ? children : <Outlet />}
    </main>
  );
};

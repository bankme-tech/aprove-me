import { AirVent } from 'lucide-react';
import { Login } from './components/login';
import { ThemeToggle } from '@/components/theme-toggle';

export const HomePage = () => {
  return (
    <main className="flex h-screen text-foreground">
      <section className="relative flex w-full flex-col items-center justify-center lg:w-1/2">
        <div className="absolute left-7 top-10 flex items-center gap-2 lg:hidden">
          <AirVent />
          <h1 className="font-semibold">AproveMe</h1>
        </div>

        <p className="text-center text-sm text-gray-500">Entre em</p>
        <h2 className="mb-4 text-xl font-bold">Aprove-me</h2>

        <Login />

        <div className="absolute right-7 top-8 lg:left-10">
          <ThemeToggle />
        </div>
      </section>

      <section className="hidden w-1/2 lg:flex">
        <img
          style={{ objectFit: 'cover' }}
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </section>
    </main>
  );
};

'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/hooks/UseAuth";
import { redirect, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, isAuthenticated, logout } = useAuth();

  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      redirect('/signIn');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isAuthenticated && (
        <div className={`${pathname !== '/payables' && 'h-full'} flex flex-col`}>
          <header className="flex w-full bg-neutral-100 p-2 items-center justify-between sm:text-lg text-sm px-4 sm:px-8 md:px-12 lg:px-18 h-20 ">
            <Link href="/create-assignor">Create assignor</Link>
            <Link href="/create-payable">Create payable</Link>
            <Link href="/payables">Payables</Link>
            <button onClick={logout}>Logout</button>
          </header>
          <main className="w-full flex flex-col items-center justify-center gap-4 px-4 sm:px-8 md:px-12 lg:px-18 h-full">
            {children}
          </main>
        </div>

      )}
    </>

  );
}

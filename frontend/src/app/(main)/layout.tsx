'use client'
import Link from "next/link";
import { WithAuth } from "@/isAuthenticated";
// import "./globals.css";

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex w-full bg-neutral-100 p-4 justify-between items-center">
        <Link href="/create-assignor">Create assignor</Link>
        <Link href="/create-payable">Create payable</Link>
        <Link href="/payables">Payables</Link>
      </header>
      <main className="w-full flex flex-col items-center justify-center h-full gap-4 px-4 sm:px-8 md:px-12 lg:px-18">
        {children}
      </main>
    </>

  );
}

export default WithAuth(RootLayout);
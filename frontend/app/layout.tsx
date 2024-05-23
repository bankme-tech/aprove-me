import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aprove me",
  description: "Application for Bankme test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex w-full bg-neutral-100 p-4 justify-between items-center">
          <Link href="/">Home</Link>
          <Link href="/payables">payables</Link>
          <Link href="/">create assignor</Link>
          <Link href="/">create payable</Link>
        </header>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
}

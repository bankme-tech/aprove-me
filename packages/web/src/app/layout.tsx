import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bankme",
  description: "Sistema de gerenciamento de pagáveis",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

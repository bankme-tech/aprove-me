import type { Metadata } from "next";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import { ToastProvider } from "@/contexts/ToastContext";

export const metadata: Metadata = {
  title: "Bankme",
  description: "Quero ser Bankmer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <PrimeReactProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}

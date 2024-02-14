import type { Metadata } from "next";
import "./globals.css";
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import Tailwind from 'primereact/passthrough/tailwind';

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
        <PrimeReactProvider value={{unstyled:true, pt: Tailwind}}>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}

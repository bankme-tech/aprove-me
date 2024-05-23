import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "AproveMe",
  description: "Gerenciar Recebíveis e Cedentes",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen mx-auto", inter.className)}>
        {children ?? null}
        
        <Toaster 
        richColors
          position="top-right"
          toastOptions={{
          duration: 4500,
                  
          }}
        />

      </body>
    </html>
  );
}

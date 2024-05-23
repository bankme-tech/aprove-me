import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";;
import { ClientReactQuery } from "@/providers/client-react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AproveMe",
  description: "AproveMe é uma plataforma de gerenciamento de pagamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "!p-4")}>
        <main className="mx-auto max-w-4xl">
            <ClientReactQuery>
                {children}
            </ClientReactQuery>
        </main>
        <Toaster />
      </body>
    </html>
  );
}

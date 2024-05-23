import { NavBar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AproveMe",
  description: "AproveMe é uma plataforma de gerenciamento de pagamentos.",
};

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "!p-4")}>
        <NavBar />

        <main className="mx-auto max-w-4xl pt-4">
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

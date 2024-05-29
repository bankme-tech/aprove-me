import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PayableProvider } from "@/context/payable/payable.provider";
import "./globals.css";
import { QueryProvider } from "@/context/query-client/query.provider";
import { AssignorProvider } from "@/context/assignor/assignor.provider";
import { AuthProvider } from "@/context/auth/auth.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aprove-me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <AssignorProvider>
              <PayableProvider>{children}</PayableProvider>
            </AssignorProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

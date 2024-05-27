import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PayableProvider } from "@/context/payable/payable.provider";
import "./globals.css";
import { AssignorProvider } from "@/context/assignor/assignor.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AssignorProvider>
            <PayableProvider>{children}</PayableProvider>
          </AssignorProvider>
      </body>
    </html>
  );
}

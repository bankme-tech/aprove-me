"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeaderRoutes = ["/login", "/signup"];

  const shouldShowHeader = !noHeaderRoutes.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}

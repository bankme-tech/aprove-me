"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
`

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeaderRoutes = ["/login", "/signup"];

  const shouldShowHeader = !noHeaderRoutes.includes(pathname);

  return (
    <>
      <GlobalStyle />
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}

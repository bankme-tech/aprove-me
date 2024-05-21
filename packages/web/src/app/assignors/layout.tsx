"use client";

import Header from "@/components/header";

export default function AssignorsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

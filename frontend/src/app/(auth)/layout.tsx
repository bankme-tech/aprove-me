"use client";

import { Sidebar } from "@/components/organisms/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({
  children, // will be a page or nested layout
}: any) => {
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    if (!token) {
      router.push("/");
    }
  }, [router]);

  if (!token) {
    return null;
  }

  return (
    <section className="flex flex-wrap h-screen">
      <div className="w-1/3 lg:w-[20rem]">
        <Sidebar />
      </div>
      <div className="w-2/3 lg:flex-grow pt-8 pr-8 lg:pl-8">{children}</div>
    </section>
  );
};

export default DashboardLayout;

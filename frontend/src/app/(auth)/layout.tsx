"use client";

import { Sidebar } from "@/components/organisms/Sidebar";
import { authenticated } from "@/services";
import { Children } from "@/types/children";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: Children) => {
  const [isAuthenticated, setIsAuthenticated] = useState<object | Error>();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setIsAuthenticated(await authenticated());
    };

    fetch();
  }, []);

  if (isAuthenticated instanceof Error) {
    router.push("/");
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

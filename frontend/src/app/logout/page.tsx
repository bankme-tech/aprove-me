"use client";

import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.setItem("token", "");
  }

  router.push("/");

  return <></>;
};

export default LogOut;

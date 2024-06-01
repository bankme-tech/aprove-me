"use client";

import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  localStorage.setItem("token", "");

  router.push("/");
};

export default LogOut;

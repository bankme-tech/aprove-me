"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiCall } from "@/lib/api-call";
import { usePathname } from "next/navigation";

export default function NavbarLogin() {
  const [greeting, setGreeting] = useState<string>("");
  const [link, setLink] = useState<string>("/login");
  /** Using pathname update to rerun token check. */
  const pathname = usePathname();

  function getGreeting(login?: string) {
    const greeting = login ? `Olá ${login}!` : "Olá!";
    const hour = new Date().getHours();

    if (hour >= 0 && hour <= 5) {
      return `${greeting} Boa madrugada`;
    } else if (hour >= 6 && hour < 12) {
      return `${greeting} Bom dia`;
    } else if (hour >= 12 && hour < 18) {
      return `${greeting} Boa tarde`;
    } else if (hour >= 18 && hour <= 23) {
      return `${greeting} Boa noite`;
    }

    return greeting;
  }
  /** Error in `/integrations/auth/token` usually means: user with expired token. */
  function ignoreExpiredError(_err: any) { }

  useEffect(() => {
    apiCall({
      endpoint: "/integrations/auth/token",
      method: 'GET',
    }).then((res) => {
      const login = res?.result?.user?.login;

      if (login) {
        setLink("/login/editar");
        setGreeting(getGreeting(login));
      } else {
        setLink("/login");
        setGreeting("Entrar");
      }
    }).catch(ignoreExpiredError);
  }, [pathname]);

  return (
    <div>
      <Link href={link}
        className="block mt-4 sm:inline-block sm:mt-0 sm:mx-5 text-secondary hover:font-semibold mr-4">
        {greeting}
      </Link >
    </div>
  );
}

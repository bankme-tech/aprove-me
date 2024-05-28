"use client";

import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function NavigationBar() {
  const pathname = usePathname();
  const { push } = useRouter();

  const logout = () => {
    localStorage.removeItem("BANKME_TOKEN");
    push("/");
  }

  return (
    <Navbar shouldHideOnScroll className="p-4 mb-32">
      <Link href="/register-payable" aria-current="page">
      <Image
        src="/logo-bankme.png"
        width={50}
        height={50}
        alt="logo bank-me"
      ></Image>
      </Link>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem isActive>
          <Link href= {pathname === "/register-payable"
              ? "/payables"
              : "/register-payable"} aria-current="page">
            {pathname === "/register-payable"
              ? "Payables"
              : "Register Payable"}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <div className="flex justify-between w-36 p-2">
      <Button color="error" onClick={logout}>Logout</Button>
      <ModeToggle />
      </div>
    </Navbar>
  );
}

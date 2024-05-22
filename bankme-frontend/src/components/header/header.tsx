"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    isAuthenticated && (
      <header className="container flex items-center justify-between p-4">
        <Link href={"/payable"} className="text-3xl text-primary font-semibold">
          Bankme
        </Link>

        <nav>
          <ul className="flex items-center gap-2">
            <li>
              <Link
                href={"/payable"}
                className={buttonVariants({ variant: "link" })}
              >
                Payables
              </Link>
            </li>

            <li>
              <Link
                href={"/assignor"}
                className={buttonVariants({ variant: "link" })}
              >
                Assignors
              </Link>
            </li>

            <li>
              <Button variant={"link"} size={"sm"} onClick={() => logout()}>
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    )
  );
}

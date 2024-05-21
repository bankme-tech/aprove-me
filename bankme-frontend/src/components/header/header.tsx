import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="container flex items-center justify-between p-4">
      <Link href={"/payable"} className="text-3xl text-primary font-semibold">
        Bankme
      </Link>

      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href={"/payable"}
              className={buttonVariants({ variant: "link" })}
            >
              payables
            </Link>
            <Link
              href={"/assignor"}
              className={buttonVariants({ variant: "link" })}
            >
              assignors
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

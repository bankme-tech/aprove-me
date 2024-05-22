"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex justify-between py-5 max-w-7xl mx-auto">
      <Link href="/payables">
        <div className="flex items-center space-x-5">
          <Image src="/logo-bankme.png" width={50} height={50} alt="Bankme Logo" />
          <div>
            <h1 className="font-bold">Aprove me</h1>
            <p className="text-sm text-gray-500">Gestão de pagáveis</p>
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-5 text-gray-500">
        <Link href="/payables">
          <Button variant="outline">Pagáveis</Button>
        </Link>
        <Link href="/assignors">
          <Button variant="outline">Cedentes</Button>
        </Link>
      </div>
    </header>
  );
}

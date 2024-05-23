"use client";

import React from "react";
import Link from "next/link";

export const NavBar: React.FunctionComponent = () => (
  <nav className="flex items-center space-x-4 lg:space-x-6 mx-auto max-w-4xl bg-stone-800 p-4 rounded-xl">
    <Link href="/payables" className="text-sm font-medium transition-colors text-white hover:text-secondary">
        Pagáveis
    </Link>

    <Link href="/assignors" className="text-sm font-medium transition-colors text-white hover:text-secondary">
        Cedentes
    </Link>
  </nav>
);

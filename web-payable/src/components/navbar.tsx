import Link from "next/link"
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  path: string;
  label: string;
}

export default function Navbar() {
  const navItem: NavItem[] = [
    { path: '/cedentes', label: 'Cedentes' },
    { path: '/pagaveis', label: 'Pagáveis' },
  ];

  return (
    <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
      <div className="w-full flex-grow flex sm:items-center sm:w-auto">
        <div className="text-sm flex-grow">
          {navItem.map((l) =>
            <Link key={l.path} href={l.path}
              className="block mt-4 sm:inline-block sm:mt-0 sm:mx-5 text-secondary hover:font-semibold mr-4">
              {l.label}
            </Link >)}
        </div>
        <div className="my-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

import { AirVent, ArrowRightFromLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between">
      <Link to={'/app'} className="flex items-center gap-2">
        <AirVent />
        <h1 className="font-medium tracking-wide">Aprove-me</h1>
      </Link>

      <ul className="flex items-center gap-2 text-xs sm:gap-3 sm:text-base">
        <li>
          <ThemeToggle />
        </li>

        <li>
          <Link to={'/app'}>Home</Link>
        </li>

        <li>
          <Link to={'/app/cadastro'}>Cadastro</Link>
        </li>

        <li>
          <Link
            to={'/'}
            className="flex h-9 w-9 items-center justify-center rounded-md border shadow-sm transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowRightFromLine className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

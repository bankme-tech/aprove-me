import { useNavigate } from "react-router-dom";
import MenuItem from "./menuItem"
import { GoSignOut } from "react-icons/go";
import { FiMenu } from 'react-icons/fi';
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <header
      className="font-Nunito bg-HeaderBgColor flex w-full justify-between py-5 px-8 md:px-16 shadow-md text-textColor"
    >
      <img
        src={process.env.PUBLIC_URL + '/logo-bankme.png'}
        alt="Logo bankme"
        className="h-8 w-auto"
      />

      <div className="flex gap-3 items-center md:gap-12 relative md:static">
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMenu size={24} />
        </button>

        <ul className={"flex gap-6 flex-col md:flex-row absolute md:static top-12 py-4 px-12 md:p-0 shadow-md md:shadow-none right-0 md:bg-transparent bg-HeaderBgColor z-50 " + (isMenuOpen ? '' : 'hidden md:flex')}>
          <MenuItem to="/payables/new" setIsMenuOpen={setIsMenuOpen}>Cadastrar Pagável</MenuItem>
          <MenuItem to="/assignor/new" setIsMenuOpen={setIsMenuOpen}>Cadastrar Cedente</MenuItem>
          <MenuItem to="/payables" setIsMenuOpen={setIsMenuOpen}>Lista de Pagáveis</MenuItem>
        </ul>

        <button
          onClick={handleSignOut}
          className="flex gap-1 items-center p-1 hover:text-themeColor ease-in-out duration-200"
        >
          <span className="hidden md:block">Sair</span>
          <GoSignOut size={22} />
        </button>
      </div>

    </header>
  )
}
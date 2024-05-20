import { useNavigate } from "react-router-dom";
import MenuItem from "./menuItem"
import { GoSignOut } from "react-icons/go";


export default function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };
  
  return (
    <header
      className="font-Nunito bg-HeaderBgColor flex w-full justify-between py-5 px-16 shadow-md text-textColor"
    >
      <img
        src="logo-bankme.png"
        alt="Logo bankme"
        className="h-8 w-auto"
      />

      <div className="flex gap-12 items-center">
        <ul className="flex gap-6">
          <MenuItem to="/payables/new">Cadastrar Pagável</MenuItem>
          <MenuItem to="/assignor/new">Cadastrar Cedente</MenuItem>
          <MenuItem to="/payables">Lista de Pagáveis</MenuItem>
        </ul>

        <button
          onClick={handleSignOut}
          className="flex gap-1 items-center hover:text-themeColor ease-in-out duration-200"
        >
          <span>Sair</span>
          <GoSignOut size={18} />
        </button>
      </div>
    </header>
  )
}
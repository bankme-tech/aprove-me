import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex py-4 gap-6 items-center">
      <Link to="/" className="text-blue-700 font-semibold ">
        Pagáveis
      </Link>
      <Link to="/payable/new" className="text-blue-700 font-semibold ">
        Criar Pagável
      </Link>
      <Link to="/assignor/new" className="text-blue-700 font-semibold ">
        Criar Cedente
      </Link>
    </div>
  );
};

export default Header;

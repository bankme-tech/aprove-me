import { useNavigate } from 'react-router';
import '../styles/header.css';
export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="header">
      <h1>Bankme</h1>
      <nav onClick={() => navigate('/payable/create')}>Criar Pagável</nav>
      <nav onClick={() => navigate('/payable/list')}>Consultar Pagáveis</nav>
      <nav onClick={() => navigate('/assignor/create')}>Criar Cedente</nav>
      <nav onClick={() => navigate('/assignor/list')}>Consultar Cedentes</nav>
    </header>
  );
}
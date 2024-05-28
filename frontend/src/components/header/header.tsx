import { useEffect, useState } from 'react';
import { GetProfileApi } from '../../service/UserApi';
import { HeaderContainer, HeaderContent } from './styled';
import { LogoutButton } from './styled';
import { Link } from 'react-router-dom';

export const HeaderComponent = () => {
  const [timeLogged, setTimeLogged] = useState('');
  const [count, setCount] = useState(0);
  const [logOut, setLogOut] = useState(false);

  const parse = JSON.parse(localStorage.getItem('user') || '{}');
  const { date } = parse;
  const dateNow = new Date();
  const getDateTime = new Date(date);
  const diff = dateNow.getTime() - getDateTime.getTime();
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLogged(formattedElapsedTime);
      setCount(count + 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [count]);

  const elapsedHours = Math.floor(diff / 3600000);
  const elapsedMinutes = Math.floor((diff % 3600000) / 60000);
  const elapsedSeconds = Math.floor((diff % 60000) / 1000);
  const formattedElapsedTime = `${elapsedHours}h ${elapsedMinutes}min ${elapsedSeconds}s`;

  useEffect(() => {
    const logout = setInterval(handleTokenExpireLogout, 60000);

    return () => clearInterval(logout);
  }, []);

  const handleTokenExpireLogout = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const isValid = await GetProfileApi(token);

      if (!isValid.id && !isValid.login) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      }

    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
  }
  const handleLogoutButton = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setLogOut(true);
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }    
  }

  return (
    <HeaderContainer>
      <LogoutButton
        onClick={handleLogoutButton}
      >
        { logOut ? 'Deslogando' : 'Deslogar' }
      </LogoutButton>
      <div>
        <h2>Você está logado há:</h2>
        <h2>{ timeLogged }</h2>
        <h2>ID: {parse.id}</h2>
      </div>
      <HeaderContent>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/payable">Lista de pagáveis</Link>
          <Link to='/assignor'>Lista de cedentes</Link>
          <Link to="/payable/register">Cadastrar pagável</Link>
          <Link to="/assignor/register">Cadastrar cedente</Link>
        </nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
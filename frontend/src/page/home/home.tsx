import { useEffect, useState } from 'react'
import { Container, Content, HeaderHome, LogoutButton } from './style'
import { GetProfileApi } from '../../service/UserApi';
import { DisplayPayables } from '../../components/payables/display/displayPayables';
import { CreatePayable } from '../../components/payables/create/registerPayable';

export const Home = () => {
  const [timeLogged, setTimeLogged] = useState('');
  const [count, setCount] = useState(0);
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

  useEffect(() => {
   
    const logout = setInterval(handleLogout, 15000);

    return () => clearInterval(logout);
  }, []);

  const handleLogout = async () => {
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

  const elapsedHours = Math.floor(diff / 3600000);
  const elapsedMinutes = Math.floor((diff % 3600000) / 60000);
  const elapsedSeconds = Math.floor((diff % 60000) / 1000);
  const formattedElapsedTime = `${elapsedHours}h ${elapsedMinutes}min ${elapsedSeconds}s`;

  return (
    <Container>
      <HeaderHome>
        <LogoutButton>Logout</LogoutButton>
        <h1>Seja bem-vindo!</h1>
        <h2>Você está logado há: {timeLogged}</h2>
        <h2>ID: {parse.id}</h2>
      </HeaderHome>
      <Content>
        <CreatePayable />
        <DisplayPayables />
      </Content>
    </Container>
  );
}
import axios from 'axios';

export async function login(login: string, password: string){
  const user = await axios.post('http://localhost:3000/integrations/auth', {
    data: {
      login,
      password
    }
  });

  return user;
}

export async function register(login: string, password: string){
  const user = await axios.post('http://localhost:3000/integrations/auth/register', {
    data: {
      login,
      password
    }
  });

  return user;
}

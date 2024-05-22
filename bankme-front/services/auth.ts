import axios, { AxiosError } from 'axios';

export async function login(login: string, password: string){
  try {
    const user = await axios.post('http://localhost:3000/integrations/auth', {
        login,
        password
    });

    return user;
  } catch (e: any) {
    const status = e.response ? e.response.data.statusCode : 'Network Error';
    const message = e.response ? e.response.data.message : e.message;

    return { status, message, data: '' };
  }
}

export async function register(login: string, password: string){
  try {
    const user = await axios.post('http://localhost:3000/integrations/auth/register', {
        login,
        password
    });

    return user;
  } catch (e: any) {
    const status = e.response ? e.response.data.statusCode : 'Network Error';
    const message = e.response ? e.response.data.message : e.message;

    return { status, message, data: '' };
  }
}

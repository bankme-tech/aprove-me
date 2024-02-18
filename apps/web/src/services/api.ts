import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          localStorage.removeItem('@approve-me:username');
          localStorage.removeItem('@approve-me:token');

          window.location.href = '/sign/in';
        }
      }

      return Promise.reject(error);
    }
  },
);

import axios, { AxiosError } from 'axios';

export const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

export function handleResponseError(error: unknown): string[] {
  if (error instanceof AxiosError) {
    const responseErrorMessage = error.response?.data?.message;

    if (responseErrorMessage) {
      if (Array.isArray(responseErrorMessage)) {
        return responseErrorMessage as string[];
      }
      return [responseErrorMessage as string];
    }
  }

  return ['unknown_error'];
}

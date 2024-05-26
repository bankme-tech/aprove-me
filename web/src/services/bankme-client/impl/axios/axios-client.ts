import type { AxiosInstance } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

import { config } from '@/config';
import { AppRoutes } from '@/constants/app-routes';

export class AxiosClient {
  api: AxiosInstance;

  constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: `${config.apiBaseURL}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    });

    this.api.interceptors.request.use(
      (_config) => {
        const token = Cookies.get('accessToken');
        const newConfig = { ..._config };
        if (token) {
          newConfig.headers.Authorization = `Bearer ${token}`;
        }
        return newConfig;
      },
      (error) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          error.response?.data?.message === 'Invalid token'
        ) {
          Cookies.remove('accessToken');
          window.location.href = AppRoutes.auth.login;
          return Promise.reject();
        }
        return Promise.reject(error);
      },
    );
  }
}

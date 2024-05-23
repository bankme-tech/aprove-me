import type { AxiosInstance } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

import { config } from '@/config';

export class Client {
  api: AxiosInstance;

  constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: `${config.apiBaseURL}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    });
  }
}

import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { config } from '@/config';

export class Client {
  api: AxiosInstance;

  constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: `${config.apiBaseURL}/${endpoint}`,
    });
  }
}

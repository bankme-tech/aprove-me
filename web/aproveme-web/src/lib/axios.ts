import axios from 'axios'

import { env } from '@/env/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

import axios from 'axios'

import { env } from '@/env/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

const publicRoutes = ['/integrations/sessions', '/integrations/auth']

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@aproveme/access_token')

    if (token && !publicRoutes.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

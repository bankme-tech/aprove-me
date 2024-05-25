import { api } from '@/lib/axios'

export interface CreateAccountBody {
  login: string
  password: string
}

export const createAccount = async ({ login, password }: CreateAccountBody) => {
  await api.post('/integrations/auth', { login, password })
}

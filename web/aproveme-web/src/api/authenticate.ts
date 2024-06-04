import { api } from '@/lib/axios'

export interface AuthenticateBody {
  login: string
  password: string
}

export const authenticate = async ({ login, password }: AuthenticateBody) => {
  try {
    const response = await api.post('/integrations/sessions', {
      login,
      password,
    })

    const { access_token: accessToken } = response.data

    localStorage.setItem('@aproveme/access_token', accessToken)
  } catch (error) {
    console.error('Falha na autenticação:', error)
    throw error
  }
}

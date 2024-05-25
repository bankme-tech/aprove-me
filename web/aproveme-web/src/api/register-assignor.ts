import { api } from '@/lib/axios'

export interface RegisterAssignorBody {
  document: string
  email: string
  phone: string
  name: string
}

export const registerAssignor = async ({
  document,
  email,
  name,
  phone,
}: RegisterAssignorBody) => {
  await api.post('/integrations/assignor', { document, email, name, phone })
}

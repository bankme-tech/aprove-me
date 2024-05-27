import { api } from '@/lib/axios'

export interface EditAssignorBody {
  id: string
  document: string | null
  email: string | null
  phone: string | null
  name: string | null
}

export const editAssignor = async ({
  id,
  document,
  email,
  name,
  phone,
}: EditAssignorBody) => {
  await api.put(`/integrations/assignor/${id}`, {
    document,
    email,
    name,
    phone,
  })
}

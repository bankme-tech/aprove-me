import { api } from '@/lib/axios'

export interface EditAssignorBody {
  id: string
  document: string
  email: string
  phone: string
  name: string
  payableId: string
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

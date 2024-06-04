import { api } from '@/lib/axios'

export interface EditPayableBody {
  id: string
  value: number
}

export const editPayable = async ({ id, value }: EditPayableBody) => {
  await api.put(`/integrations/payable/${id}`, { value })
}

import { api } from '@/lib/axios'

export const deletePayable = async (id: string) => {
  const response = await api.delete(`/integrations/payable/${id}`)

  console.log(response)
}

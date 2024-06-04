import { api } from '@/lib/axios'

export const deleteAssignor = async (id: string) => {
  await api.delete(`/integrations/assignor/${id}`)
}

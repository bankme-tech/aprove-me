import { api } from '@/lib/axios'

export interface FetchAssignorsNamesResponse {
  id: string
  name: string
}

export const fetchAssignorsNames = async () => {
  const response = await api.get<FetchAssignorsNamesResponse[]>(
    '/integrations/assignor',
  )

  return response.data
}

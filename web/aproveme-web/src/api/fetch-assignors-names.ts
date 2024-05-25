import { api } from '@/lib/axios'

export interface FetchOrdersResponse {
  assignorsNames: {
    id: string
    name: string
  }[]
}

export const fetchAssignorsNames = async () => {
  const response = await api.get<FetchOrdersResponse>('/integrations/assignor')

  return response.data
}

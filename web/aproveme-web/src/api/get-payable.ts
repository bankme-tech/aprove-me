import { api } from '@/lib/axios'

export interface GetPayableBody {
  payableWithAssignor: {
    payableId: string
    value: number
    emissionDate: Date
    assignor: {
      id: string
      document: string
      email: string
      name: string
      phone: string
    }
  }
}

export const getPayable = async (id: string) => {
  const response = await api.get<GetPayableBody>(`/integrations/payable/${id}`)

  return response.data
}

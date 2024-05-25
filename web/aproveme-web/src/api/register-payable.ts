import { api } from '@/lib/axios'

export interface RegisterPayableBody {
  value: number
  emissionDate: Date
  assignorId: string
}

export const registerPayable = async ({
  value,
  emissionDate,
  assignorId,
}: RegisterPayableBody) => {
  const response = await api.post('/integrations/payable', {
    value,
    emissionDate,
    assignorId,
  })

  console.log(response.data)
}

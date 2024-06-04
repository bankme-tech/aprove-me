import { api } from '@/lib/axios'

export interface FetchPayableQuery {
  page: number
}

export interface FetchPayablesResponse {
  payables: {
    id: string
    assignorId: string
    value: number
    emissionDate: Date
  }[]
  totalCount: number
}

export const fetchPayables = async ({ page }: FetchPayableQuery) => {
  const response = await api.get<FetchPayablesResponse>(
    '/integrations/payable',
    {
      params: {
        page,
      },
    },
  )

  return response.data
}

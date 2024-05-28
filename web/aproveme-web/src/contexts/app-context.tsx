import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createContext } from 'use-context-selector'
import { z } from 'zod'

import { deleteAssignor } from '@/api/delete-assignor'
import { deletePayable } from '@/api/delete-payable'
import { editAssignor, EditAssignorBody } from '@/api/edit-assignor'
import { editPayable, EditPayableBody } from '@/api/edit-payable'
import { fetchAssignorsNames } from '@/api/fetch-assignors-names'
import { FetchPayablesResponse } from '@/api/fetch-payables'
import { GetPayableBody } from '@/api/get-payable'
import { registerAssignor, RegisterAssignorBody } from '@/api/register-assignor'
import { registerPayable, RegisterPayableBody } from '@/api/register-payable'

interface AppProviderProps {
  children: ReactNode
}

interface Assignor {
  id: string
  name: string
}

interface AppContextType {
  assignorsNames: Assignor[]
  registerPayableFn: (data: RegisterPayableBody) => Promise<void>
  refreshAssignorsNames: () => void
  registerAssignorFn: (data: RegisterAssignorBody) => Promise<void>
  deletePayableFn: (payableId: string) => Promise<void>
  editPayableFn: (data: EditPayableBody) => Promise<void>
  editAssignorFn: (data: EditAssignorBody) => Promise<void>
  deleteAssignorFn: (id: string) => Promise<void>
}

export const AppContext = createContext({} as AppContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [assignorsNames, setAssignorsNames] = useState<Assignor[]>([])

  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // Mutations
  const { mutateAsync: fetchAssignorsNamesFn } = useMutation({
    mutationFn: fetchAssignorsNames,
  })
  const { mutateAsync: registerPayableFn } = useMutation({
    mutationFn: registerPayable,
  })
  const { mutateAsync: registerAssignorFn } = useMutation({
    mutationFn: registerAssignor,
  })
  const { mutateAsync: deletePayableFn } = useMutation({
    mutationFn: deletePayable,
  })
  const { mutateAsync: editPayableFn } = useMutation({
    mutationFn: editPayable,
    onSuccess(_, { id, value }) {
      // Atualiza o Payable Detail
      const cached = queryClient.getQueryData<GetPayableBody>([
        'payable-detail',
        id,
      ])
      if (cached) {
        queryClient.setQueryData<GetPayableBody>(['payable-detail', id], {
          ...cached,
          payableWithAssignor: {
            ...cached.payableWithAssignor,
            value,
          },
        })
      }

      // Atualiza a tabela de Payables
      const page = z.coerce.number().parse(searchParams.get('page') ?? '1')
      const cachedPayables = queryClient.getQueryData<FetchPayablesResponse>([
        'payables',
        page,
      ])

      if (cachedPayables) {
        // Atualizar o valor específico no array de payables
        const updatedPayables = cachedPayables.payables.map((payable) =>
          payable.id === id ? { ...payable, value } : payable,
        )

        queryClient.setQueryData<FetchPayablesResponse>(['payables', page], {
          ...cachedPayables,
          payables: updatedPayables,
        })
      }
    },
  })
  const { mutateAsync: editAssignorFn } = useMutation({
    mutationFn: editAssignor,
    onSuccess(_, { id, document, email, name, phone, payableId }) {
      // Atualiza os dados do cedente
      const cached = queryClient.getQueryData<GetPayableBody>([
        'payable-detail',
        payableId,
      ])

      if (cached) {
        queryClient.setQueryData<GetPayableBody>(
          ['payable-detail', payableId],
          {
            payableWithAssignor: {
              ...cached.payableWithAssignor,
              assignor: {
                id,
                document,
                email,
                name,
                phone,
              },
            },
          },
        )
      }
    },
  })
  const { mutateAsync: deleteAssignorFn } = useMutation({
    mutationFn: deleteAssignor,
  })

  // Callbacks
  const refreshAssignorsNames = useCallback(async () => {
    const data = await fetchAssignorsNamesFn()
    setAssignorsNames(data)
  }, [fetchAssignorsNamesFn])

  const contextValues = useMemo(
    () => ({
      assignorsNames,
      refreshAssignorsNames,
      registerPayableFn,
      registerAssignorFn,
      deletePayableFn,
      editPayableFn,
      editAssignorFn,
      deleteAssignorFn,
    }),
    [
      assignorsNames,
      registerPayableFn,
      refreshAssignorsNames,
      registerAssignorFn,
      deletePayableFn,
      editPayableFn,
      editAssignorFn,
      deleteAssignorFn,
    ],
  )

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  )
}

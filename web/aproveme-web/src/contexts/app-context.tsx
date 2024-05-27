import { useMutation } from '@tanstack/react-query'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { createContext } from 'use-context-selector'

import { deletePayable } from '@/api/delete-payable'
import { editPayable } from '@/api/edit-payable'
import { fetchAssignorsNames } from '@/api/fetch-assignors-names'
import { registerAssignor } from '@/api/register-assignor'
import { registerPayable } from '@/api/register-payable'

interface AppProviderProps {
  children: ReactNode
}

interface Assignor {
  id: string
  name: string
}

interface RegisterPayable {
  value: number
  assignorId: string
  emissionDate: Date
}

interface RegisterAssignor {
  document: string
  email: string
  phone: string
  name: string
}

interface EditPayable {
  id: string
  value: number
}

interface AppContextType {
  assignorsNames: Assignor[]
  registerPayableFn: (data: RegisterPayable) => Promise<void>
  refreshAssignorsNames: () => void
  registerAssignorFn: (data: RegisterAssignor) => Promise<void>
  deletePayableFn: (payableId: string) => Promise<void>
  editPayableFn: (data: EditPayable) => Promise<void>
}

export const AppContext = createContext({} as AppContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [assignorsNames, setAssignorsNames] = useState<Assignor[]>([])

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
    }),
    [
      assignorsNames,
      registerPayableFn,
      refreshAssignorsNames,
      registerAssignorFn,
      deletePayableFn,
      editPayableFn,
    ],
  )

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  )
}

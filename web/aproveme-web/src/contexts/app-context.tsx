import { useMutation } from '@tanstack/react-query'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { createContext } from 'use-context-selector'

import { deletePayable } from '@/api/delete-payable'
import { editAssignor, EditAssignorBody } from '@/api/edit-assignor'
import { editPayable, EditPayableBody } from '@/api/edit-payable'
import {
  fetchAssignorsNames,
  FetchAssignorsNamesResponse,
} from '@/api/fetch-assignors-names'
import { registerAssignor, RegisterAssignorBody } from '@/api/register-assignor'
import { registerPayable, RegisterPayableBody } from '@/api/register-payable'

interface AppProviderProps {
  children: ReactNode
}

interface AppContextType {
  assignorsNames: FetchAssignorsNamesResponse[]
  registerPayableFn: (data: RegisterPayableBody) => Promise<void>
  refreshAssignorsNames: () => void
  registerAssignorFn: (data: RegisterAssignorBody) => Promise<void>
  deletePayableFn: (payableId: string) => Promise<void>
  editPayableFn: (data: EditPayableBody) => Promise<void>
  editAssignorFn: (data: EditAssignorBody) => Promise<void>
}

export const AppContext = createContext({} as AppContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [assignorsNames, setAssignorsNames] = useState<
    FetchAssignorsNamesResponse[]
  >([])

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
  const { mutateAsync: editAssignorFn } = useMutation({
    mutationFn: editAssignor,
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
    }),
    [
      assignorsNames,
      registerPayableFn,
      refreshAssignorsNames,
      registerAssignorFn,
      deletePayableFn,
      editPayableFn,
      editAssignorFn,
    ],
  )

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  )
}

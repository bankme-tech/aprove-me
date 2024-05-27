import { useMutation } from '@tanstack/react-query'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { createContext } from 'use-context-selector'

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

interface AppContextType {
  assignorsNames: Assignor[]
  registerPayableFn: (data: RegisterPayable) => Promise<void>
  refreshAssignorsNames: () => void
  registerAssignorFn: (data: RegisterAssignor) => Promise<void>
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
    }),
    [
      assignorsNames,
      registerPayableFn,
      refreshAssignorsNames,
      registerAssignorFn,
    ],
  )

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  )
}

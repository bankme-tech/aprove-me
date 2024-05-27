import { useContextSelector } from 'use-context-selector'

import { AppContext } from '@/contexts/app-context'

export const useAppContext = () => {
  const context = useContextSelector(AppContext, (context) => context)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

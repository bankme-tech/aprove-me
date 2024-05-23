'use client'

import { makeQueryClient } from '@/lib/client/react-query/client'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ReactNode } from "react"

interface ClientReactQueryProps {
    children: ReactNode
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
    if (typeof window === 'undefined') {
      return makeQueryClient()
    } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
    }
}

export const queryClient = getQueryClient()

export const ClientReactQuery: React.FunctionComponent<ClientReactQueryProps> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}
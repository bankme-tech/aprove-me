'use client'

import { makeQueryClient } from '@/lib/client/react-query/client'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ReactNode } from "react"

interface ClientReactQueryProps {
    children: ReactNode
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (typeof window === 'undefined') {
      return makeQueryClient()
    } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
    }
}

export const ClientReactQuery: React.FunctionComponent<ClientReactQueryProps> = ({children}) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}
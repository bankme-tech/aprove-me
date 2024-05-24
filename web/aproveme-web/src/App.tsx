import './styles/globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from './lib/react-query'
import { router } from './routes'

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | aprove.me" />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'

export const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('@aproveme/access_token')
    if (!token) {
      navigate('/sign-in')
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}

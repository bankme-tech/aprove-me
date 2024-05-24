import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export const AppLayout = () => {
  return (
    <div>
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  )
}

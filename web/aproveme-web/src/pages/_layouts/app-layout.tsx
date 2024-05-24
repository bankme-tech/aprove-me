import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div>
      <header>Cabeçalho</header>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

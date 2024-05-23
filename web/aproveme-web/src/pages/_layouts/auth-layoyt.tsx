import { Landmark } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div>
      <div>
        <div>
          <Landmark />
          <span>aprove.me</span>
        </div>

        <footer>&copy; aprove.me - {new Date().getFullYear()}</footer>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

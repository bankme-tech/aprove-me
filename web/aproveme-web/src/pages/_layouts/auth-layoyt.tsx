import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const AuthLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('@aproveme/access_token')
    if (token) {
      navigate('/payable')
    }
  }, [navigate])
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <aside className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <header className="flex items-center gap-3 text-lg font-medium text-foreground">
          <img
            src="logo-bankme.png"
            alt="Logo BankMe"
            className="h-5 w-5"
          ></img>
          <span className="font-semibold">aprove.me</span>
        </header>

        <footer className="text-sm">
          &copy; aprove.me - {new Date().getFullYear()}
        </footer>
      </aside>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}

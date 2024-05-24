import { Landmark } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  const test = 1
  console.log(test)
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <aside className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <header className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Landmark className="h-5 w-5" />
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

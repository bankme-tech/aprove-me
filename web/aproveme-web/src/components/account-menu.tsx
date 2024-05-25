import { ChevronDown, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const AccountMenu = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('@aproveme/access_token')
    navigate('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          Perfil
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center">
          <User className="h-4 w-5" />
          <span className="text-xs font-normal text-muted-foreground">
            &nbsp; aproveme
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-emerald-500 dark:text-emerald-400"
          asChild
          disabled={false}
        >
          <button onClick={handleSignOut} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

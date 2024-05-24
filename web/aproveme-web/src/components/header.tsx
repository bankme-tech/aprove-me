import { FilePlus, Landmark, ScrollText, UserRoundPlus } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Landmark className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/payable">
            <ScrollText className="h-4 w-4" />
            Lista de Recebíveis
          </NavLink>

          <NavLink to="/payable/register">
            <FilePlus className="h-4 w-4" />
            Cadastrar Recebível
          </NavLink>

          <NavLink to="/assignor/register">
            <UserRoundPlus className="h-4 w-4" />
            Cadastrar Cedente
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}

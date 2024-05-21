import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemes } from "@/context/theme";
import { Monitor, Moon, Palette, Sun } from "lucide-react";

export function ThemeDropDown() {
  const { handleTheme } = useThemes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Palette />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mude o tema do site</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => handleTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Modo claro</span>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => handleTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Modo Escuro</span>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => handleTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>Padrão do sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

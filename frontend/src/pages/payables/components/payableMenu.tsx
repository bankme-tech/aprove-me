import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { DeletePayableDialog } from "./deletePayableDialog/deletePayableDialog";
import { Payable } from "@/types/payables";

interface PayableMenuProps {
  payable: Payable;
}

export const PayableMenu = ({ payable }: PayableMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Ações disponíveis</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(ev) => ev.preventDefault()}>
          <DeletePayableDialog payable={payable} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

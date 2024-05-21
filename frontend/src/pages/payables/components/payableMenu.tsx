import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil } from "lucide-react";
import { DeletePayableDialog } from "./deletePayableDialog/deletePayableDialog";
import { Payable } from "@/types/payables";
import { EditPayableDialog } from "./editPayableDialog/editPayableDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface PayableMenuProps {
  payable: Payable;
}

export const PayableMenu = ({ payable }: PayableMenuProps) => {
  return (
    <Dialog>
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
            <DialogTrigger className="flex justify-between w-full">
              <span>Editar</span>

              <Pencil className="mr-2 h-4 w-4" />
            </DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={(ev) => ev.preventDefault()}>
            <DeletePayableDialog payable={payable} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPayableDialog payable={payable} />
    </Dialog>
  );
};

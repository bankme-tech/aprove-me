import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Payable, deletePayable } from "@/services/payable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdatePayableForm from "../update-payable";

interface Props {
  payable: Payable;
}

export default function PayableDropdown({ payable }: Props) {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deletePayableMutation } = useMutation({
    mutationFn: deletePayable,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-all-payable"] });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer" width={20} height={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setOpenUpdateForm(true)}
            className="cursor-pointer justify-center"
          >
            edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => deletePayableMutation(payable.id)}
            className="cursor-pointer justify-center"
          >
            delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdatePayableForm
        payable={payable}
        open={openUpdateForm}
        onOpenChange={setOpenUpdateForm}
      />
    </>
  );
}

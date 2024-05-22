import { useState } from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdatePayableForm from "./update-payable";
import PayableDetails from "./payable-details";
import { Payable, deletePayable } from "@/services/payable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  payable: Payable;
}

export default function PayableDropdown({ payable }: Props) {
  const [openPayableDetails, setOpenPayableDetails] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deletePayableMutation } = useMutation({
    mutationFn: deletePayable,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-all-payable"] });
    },
    onError(err: AxiosError<any>) {
      toast(err.response?.data.message as string);
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
            onClick={() => setOpenPayableDetails(true)}
            className="cursor-pointer justify-center"
          >
            details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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

      {openPayableDetails && (
        <PayableDetails
          payable={payable}
          open={openPayableDetails}
          onOpenChange={setOpenPayableDetails}
        />
      )}

      {openUpdateForm && (
        <UpdatePayableForm
          payable={payable}
          open={openUpdateForm}
          onOpenChange={setOpenUpdateForm}
        />
      )}
    </>
  );
}

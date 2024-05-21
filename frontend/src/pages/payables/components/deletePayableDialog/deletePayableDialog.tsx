import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Payable } from "@/types/payables";
import { useAssignorStore } from "@/stores/useAssignorStore";
import { useEffect } from "react";
import { usePayableStore } from "@/stores/usePayableStore";

interface DeletedPayableData {
  payable: Payable;
}

export const DeletePayableDialog = ({ payable }: DeletedPayableData) => {
  const assignor = useAssignorStore();

  const deletePayable = usePayableStore((state) => state.deletePayable);

  useEffect(() => {
    async function handleFindAssignor() {
      assignor.findById(payable.props.assignorId);
    }
    console.log(assignor.assignor);
    handleFindAssignor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex justify-between text-start">
        <span>Apagar</span>

        <Trash2 className="mr-2 h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar este pagável</AlertDialogTitle>
          <AlertDialogDescription>
            Cuidado! Essa ação é irreversível
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <h1>Pagável a ser apagado:</h1>

          {assignor.assignor && (
            <p>Emitido por: {assignor.assignor.props?.name}</p>
          )}
          <p>Valor: {payable.props.value}</p>
          <p>
            Data de emissão:{" "}
            {new Date(payable.props.emissionDate).toLocaleDateString()}
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={() => deletePayable(payable._id)}>
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

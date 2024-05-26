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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react";

interface Props {
  label: string | ReactNode;
  title: string;
  message: string;
  id: string;
  onConfirm: (id: string) => void;
  buttonsClassName: string;
  confirmMessage?: string;
}

export function AlertModalButton(p: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        <Button className={p.buttonsClassName}>{p.label}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{p.title}</AlertDialogTitle>
          <AlertDialogDescription>{p.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={(_e) => p.onConfirm(p.id)} className={p.buttonsClassName}>
            {p.confirmMessage ?? 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

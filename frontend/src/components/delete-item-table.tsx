import { Trash } from 'lucide-react';
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
  Button,
} from './ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '@/services/api';

interface DeleteItemTableProps {
  id: string;
}

export const DeleteItemTable = ({ id }: DeleteItemTableProps) => {
  const query = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: Api.deleteReceivable,
    onSuccess: () => {
      query.refetchQueries({
        queryKey: ['receivable-table']
      })
    }
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash className="size-3" />
          <span className="sr-only">deletar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza desta ação?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser revertida. O item será permanemtemente
            deletado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => handleDelete(id)}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

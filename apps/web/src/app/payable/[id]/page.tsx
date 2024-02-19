'use client';
import React, { useState } from 'react';

import { withAuth } from '@/lib/with-auth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FetchPayableStatus,
  useFetchPayable,
} from '@/services/fetch-payable-by-id';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/lib/utils';
import {
  AlertDialogContent,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { deletePayable } from '@/services/delete-payable';
import { useToast } from '@/components/ui/use-toast';
import { EditablePayable } from '@/components/editable-payable';

function PayableDetailPage() {
  const [excludeDialogVisible, setExcludeDialogVisible] = useState(false);
  const [editableDialogVisible, setEditableDialogVisible] = useState(false);
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const { data, status, refetch } = useFetchPayable(id as string);

  const isLoading = status === FetchPayableStatus.LOADING;

  const toggleExcludeDialog = () =>
    setExcludeDialogVisible(!excludeDialogVisible);

  const toggleEditableDialog = () =>
    setEditableDialogVisible(!editableDialogVisible);

  const handleExclude = async () => {
    toggleExcludeDialog();

    const excludeResponse = await deletePayable(id as string);

    if (!excludeResponse.success) {
      toast({
        title: 'Falha ao excluir recebível',
      });
      return;
    }

    toast({
      title: 'Excluído com sucesso.',
    });
    router.push('/');
  };

  return (
    <div className="p-10 min-h-screen flex justify-center items-center">
      <div className="border border-gray-200 rounded-md p-6 max-w-[500px] w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl">Detalhes do Recebível</h2>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" onClick={toggleEditableDialog}>
              Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={toggleExcludeDialog}
            >
              Excluir
            </Button>
          </div>
        </div>
        <Separator className="mb-4 mt-4" />
        {isLoading && (
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <Skeleton className="w-[100px] h-5" />
              <Skeleton className="w-[250px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="w-[100px] h-5" />
              <Skeleton className="w-[250px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="w-[100px] h-5" />
              <Skeleton className="w-[250px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="w-[100px] h-5" />
              <Skeleton className="w-[250px]" />
            </div>
          </div>
        )}
        {!isLoading && data && (
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <span>ID:</span>
              <span className="text-gray-500">{data.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Valor:</span>
              <span className="text-gray-500">{formatMoney(data.value)}</span>
            </div>
            <div className="flex justify-between">
              <span>Data de emissão:</span>
              <span className="text-gray-500">
                {data.emissionDate.toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Cedente:</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{data.assignorName}</span>
                <Link href={`/assignor/${data.assignorId}`}>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <Separator className="mb-4 mt-8" />
        <div>
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>

      <AlertDialog open={excludeDialogVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja excluir esse recebível?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={toggleExcludeDialog}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleExclude}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {data && (
        <EditablePayable
          id={id as string}
          initialData={data}
          isOpen={editableDialogVisible}
          onClose={toggleEditableDialog}
          onEdit={refetch}
        />
      )}
    </div>
  );
}

export default withAuth(PayableDetailPage);

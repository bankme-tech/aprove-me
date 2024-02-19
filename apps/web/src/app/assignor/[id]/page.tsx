'use client';
import React, { useState } from 'react';

import { withAuth } from '@/lib/with-auth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialogContent,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  FetchAssignorStatus,
  useFetchAssignor,
} from '@/services/fetch-assignor-by-id';
import { deleteAssignor } from '@/services/delete-assignor';

function AssignorDetailsPage() {
  const [excludeDialogVisible, setExcludeDialogVisible] = useState(false);
  const [editableDialogVisible, setEditableDialogVisible] = useState(false);
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const { data, status, refetch } = useFetchAssignor(id as string);

  const isLoading = status === FetchAssignorStatus.LOADING;

  const toggleExcludeDialog = () =>
    setExcludeDialogVisible(!excludeDialogVisible);

  const toggleEditableDialog = () =>
    setEditableDialogVisible(!editableDialogVisible);

  const handleExclude = async () => {
    toggleExcludeDialog();

    const excludeResponse = await deleteAssignor(id as string);

    if (!excludeResponse.success) {
      toast({
        title: 'Falha ao excluir cedente',
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
          <h2 className="font-medium text-xl">Detalhes do Cedente</h2>
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
              <span>Nome:</span>
              <span className="text-gray-500">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span>E-mail:</span>
              <span className="text-gray-500">{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Telefone:</span>
              <span className="text-gray-500">{data.phone}</span>
            </div>
            <div className="flex justify-between">
              <span>Documento:</span>
              <span className="text-gray-500">{data.document}</span>
            </div>
          </div>
        )}
        <Separator className="mb-4 mt-8" />
        <div>
          <Button variant="outline" onClick={router.back}>
            Voltar
          </Button>
        </div>
      </div>

      <AlertDialog open={excludeDialogVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja excluir esse cedente?</AlertDialogTitle>
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

      {/* {data && (
        <EditablePayable
          id={id as string}
          initialData={data}
          isOpen={editableDialogVisible}
          onClose={toggleEditableDialog}
          onEdit={refetch}
        />
      )} */}
    </div>
  );
}

export default withAuth(AssignorDetailsPage);

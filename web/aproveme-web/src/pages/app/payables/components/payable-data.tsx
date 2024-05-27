import { useMutation, useQuery } from '@tanstack/react-query'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { deletePayable } from '@/api/delete-payable'
import { getPayable, GetPayableBody } from '@/api/get-payable'
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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface PayableDataProps {
  payableId: string
}

const editPayableForm = z.object({
  value: z.number(),
})
type EditPayableForm = z.infer<typeof editPayableForm>

export const PayableData = ({ payableId }: PayableDataProps) => {
  const navigate = useNavigate()

  const { data: payableDetail, isLoading: isPayableLoading } =
    useQuery<GetPayableBody>({
      queryKey: ['payable-detail', payableId],
      queryFn: () => getPayable(payableId),
      staleTime: Infinity, // Em quanto tempo essa informação se torna obsoleta,
      enabled: !!payableId, // Habilita a query apenas se payableId estiver disponível
    })

  const { payableWithAssignor: { value = 0, emissionDate = new Date() } = {} } =
    payableDetail || {}

  const [isPayableEditable, setIsPayableEditable] = useState(false)

  const {
    register: payableRegister,
    // handleSubmit: handlePayableSubmit,
    // formState: { isSubmitting: isPayableSubmitting },
  } = useForm<EditPayableForm>({
    defaultValues: {
      value,
    },
  })

  const { mutateAsync: deletePayableFn } = useMutation({
    mutationFn: deletePayable,
  })

  const handleDelete = async () => {
    try {
      await deletePayableFn(payableId)
      navigate(0)
    } catch {
      toast.error('Erro ao deletar o recebível.')
    }
  }

  const handlePayableEdit = () => {
    setIsPayableEditable(!isPayableEditable)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center">
            Emitido{' '}
            {isPayableLoading ? (
              <Skeleton className="h-4 w-12" />
            ) : (
              formatDistanceToNow(emissionDate, {
                locale: ptBR,
                addSuffix: true,
              })
            )}
          </TableHead>
          <TableHead className="pr-10 text-center">Valor</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableFooter className="">
        <TableRow>
          <TableCell className="mt-1.5 flex gap-5">
            <p>Data:</p>
            {isPayableLoading ? (
              <Skeleton className="h-4 w-12" />
            ) : (
              format(new Date(emissionDate), 'dd/MM/yyyy', {
                locale: ptBR,
              })
            )}
          </TableCell>

          <TableCell className="w-30">
            {isPayableLoading ? (
              <Skeleton className="h-4 w-12" />
            ) : isPayableEditable ? (
              <Input className="h-6 w-24" {...payableRegister('value')} />
            ) : (
              value?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            )}
          </TableCell>

          <TableCell className="w-10">
            <Button variant={'outline'} size={'sm'} onClick={handlePayableEdit}>
              {isPayableEditable ? (
                <Check className="h-4 w-4"></Check>
              ) : (
                <Pencil className="h-4 w-4" />
              )}
            </Button>
          </TableCell>

          <TableCell className="w-10">
            {isPayableEditable ? (
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={handlePayableEdit}
              >
                <X className="h-4 w-4"></X>
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'outline'} size={'sm'}>
                    <Trash2 className="h-4 w-4 " />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem mesmo certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso vai deletar
                      permanentemente o recebível e remover os dados do
                      servidor.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600"
                      onClick={handleDelete}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

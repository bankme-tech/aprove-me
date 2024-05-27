import { useQuery } from '@tanstack/react-query'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { useAppContext } from '@/hooks/use-app-context'

interface PayableDataProps {
  payableId: string
}

const editPayableForm = z.object({
  value: z.number(),
})
type EditPayableForm = z.infer<typeof editPayableForm>

export const PayableData = ({ payableId }: PayableDataProps) => {
  const { deletePayableFn, editPayableFn } = useAppContext()
  const navigate = useNavigate()
  const [isPayableEditable, setIsPayableEditable] = useState(false)

  const { data: payableDetail, isLoading: isPayableLoading } =
    useQuery<GetPayableBody>({
      queryKey: ['payable-detail', payableId],
      queryFn: () => getPayable(payableId),
      staleTime: Infinity, // Em quanto tempo essa informação se torna obsoleta,
      enabled: !!payableId, // Habilita a query apenas se payableId estiver disponível
    })

  const { payableWithAssignor: { value = 0, emissionDate = new Date() } = {} } =
    payableDetail || {}

  const {
    register: payableRegister,
    handleSubmit,
    // formState: { isSubmitting: isPayableSubmitting },
  } = useForm<EditPayableForm>({
    values: {
      value,
    },
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

  const handleEditSubmition = async ({ value }: EditPayableForm) => {
    try {
      await editPayableFn({ id: payableId, value: Number(value) })

      handlePayableEdit()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao editar o recebível.')
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data de Emissão</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Editar</TableHead>
          <TableHead>Deletar</TableHead>
        </TableRow>
      </TableHeader>

      <TableFooter className="">
        <TableRow>
          <TableCell className="mt-4 flex flex-col pt-0">
            {isPayableLoading ? (
              <Skeleton className="h-4 w-12" />
            ) : (
              <p>
                {format(new Date(emissionDate), 'dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </p>
            )}
            {isPayableLoading ? (
              <Skeleton className="h-4 w-12" />
            ) : (
              <span className="text-xs">
                {formatDistanceToNow(emissionDate, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
            )}
          </TableCell>

          <TableCell className="w-32">
            {isPayableLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : isPayableEditable ? (
              <Input
                className="h-6 w-24"
                {...payableRegister('value')}
                type="number"
              />
            ) : (
              value?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            )}
          </TableCell>

          <TableCell className="w-10">
            {isPayableEditable ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'outline'} size={'sm'}>
                    <Check className="h-4 w-4"></Check>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem mesmo certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso vai alterar
                      permanentemente os dados do recebível no servidor.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        className="bg-red-600  text-white"
                        onClick={
                          isPayableEditable
                            ? handleSubmit(handleEditSubmition)
                            : handlePayableEdit
                        }
                      >
                        Continuar
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={handlePayableEdit}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
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

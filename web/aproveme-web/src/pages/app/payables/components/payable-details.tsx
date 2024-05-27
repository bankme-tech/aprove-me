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
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface PayableDetailsProps {
  payableId: string
}

const editPayableForm = z.object({
  value: z.number(),
})
type EditPayableForm = z.infer<typeof editPayableForm>

const editAssignorForm = z.object({
  document: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
})
type EditAssignorForm = z.infer<typeof editAssignorForm>

export const PayableDetails = ({ payableId }: PayableDetailsProps) => {
  const navigate = useNavigate()

  const [isAssignorEditable, setIsAssignorEditable] = useState(false)
  const [isPayableEditable, setIsPayableEditable] = useState(false)

  const { data: payableDetail, isLoading: isPayableLoading } =
    useQuery<GetPayableBody>({
      queryKey: ['payable-detail', payableId],
      queryFn: () => getPayable(payableId),
      staleTime: Infinity, // Em quanto tempo essa informação se torna obsoleta,
      enabled: !!payableId, // Habilita a query apenas se payableId estiver disponível
    })

  // Desestruturação dos dados
  const {
    payableWithAssignor: {
      payableId: id = '',
      value = 0,
      emissionDate = new Date(),
      assignor: { name = '', phone = '', email = '', document = '' } = {},
    } = {},
  } = payableDetail || {}

  const { mutateAsync: deletePayableFn } = useMutation({
    mutationFn: deletePayable,
  })

  const {
    register: payableRegister,
    handleSubmit: handlePayableSubmit,
    formState: { isSubmitting: isPayableSubmitting },
  } = useForm<EditPayableForm>({
    defaultValues: {
      value,
    },
  })
  const {
    register: assignorRegister,
    handleSubmit: handleAssignorSubmit,
    formState: { isSubmitting: isAssignorSubmitting },
  } = useForm<EditAssignorForm>({
    values: {
      document,
      email,
      name,
      phone,
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

  const handleAssignorEdit = () => {
    setIsAssignorEditable(!isAssignorEditable)
  }
  const handlePayableEdit = () => {
    setIsPayableEditable(!isPayableEditable)
  }

  return (
    <>
      <DialogContent>
        {payableDetail && (
          <>
            <DialogHeader className="flex flex-row items-baseline gap-1">
              <DialogTitle>Detalhes do recebível:</DialogTitle>

              <DialogDescription className="flex  text-sm">
                &nbsp;
                {isPayableLoading ? <Skeleton className="h-4 w-64" /> : id}
              </DialogDescription>
            </DialogHeader>

            <section className="space-y-6">
              {/* {Dados do Recebível} */}
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
                        <Input
                          className="h-6 w-24"
                          {...payableRegister('value')}
                        />
                      ) : (
                        value?.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      )}
                    </TableCell>

                    <TableCell className="w-10">
                      <Button
                        variant={'outline'}
                        size={'sm'}
                        onClick={handlePayableEdit}
                      >
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
                              <AlertDialogTitle>
                                Tem mesmo certeza?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso vai
                                deletar permanentemente o recebível e remover os
                                dados do servidor.
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

              {/* {Dados do Cedente} */}
              <h3 className="font-bold">Cedente:</h3>
              <Table className="-mt-1">
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Nome
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-32" />
                      ) : isAssignorEditable ? (
                        <Input
                          className="h-6 w-36"
                          {...assignorRegister('name')}
                        />
                      ) : (
                        name
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Telefone
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-32" />
                      ) : isAssignorEditable ? (
                        <Input
                          className="h-6 w-36"
                          {...assignorRegister('phone')}
                        />
                      ) : (
                        phone
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Email
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-32" />
                      ) : isAssignorEditable ? (
                        <Input
                          className="h-6 w-36"
                          {...assignorRegister('email')}
                        />
                      ) : (
                        email
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Documento
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-32" />
                      ) : isAssignorEditable ? (
                        <Input
                          className="h-6 w-36"
                          {...assignorRegister('document')}
                        />
                      ) : (
                        document
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            {/* {Seção de botões} */}
            <section className="flex justify-evenly gap-1">
              {isAssignorEditable ? (
                <Button
                  className="w-full bg-red-600 font-bold text-white hover:bg-destructive/90"
                  size={'xs'}
                  onClick={handleAssignorEdit}
                >
                  Cancelar
                </Button>
              ) : (
                <Button
                  onClick={handleAssignorEdit}
                  className="w-full bg-amber-500 font-bold text-black  hover:bg-blue-600 hover:text-white dark:bg-amber-400 dark:hover:bg-blue-600"
                  size={'xs'}
                >
                  Editar
                </Button>
              )}

              {isAssignorEditable ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full" variant={'success'} size={'xs'}>
                      Salvar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem mesmo certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso vai alterar
                        permanentemente os dados no servidor.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          className="bg-red-600  text-white"
                          onClick={handleAssignorEdit}
                        >
                          Continuar
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <></>
              )}
            </section>
          </>
        )}
      </DialogContent>
    </>
  )
}

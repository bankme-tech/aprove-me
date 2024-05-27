import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface AssignorDataProps {
  payableId: string
}

const editAssignorForm = z.object({
  document: z.string(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
})
type EditAssignorForm = z.infer<typeof editAssignorForm>

export const AssignorData = ({ payableId }: AssignorDataProps) => {
  const [isAssignorEditable, setIsAssignorEditable] = useState(false)

  const { data: payableDetail, isLoading: isPayableLoading } =
    useQuery<GetPayableBody>({
      queryKey: ['payable-detail'],
      queryFn: () => getPayable(payableId),
      staleTime: Infinity, // Em quanto tempo essa informação se torna obsoleta,
      enabled: !!payableId, // Habilita a query apenas se payableId estiver disponível
    })

  const {
    payableWithAssignor: {
      assignor: { name = '', phone = '', email = '', document = '' } = {},
    } = {},
  } = payableDetail || {}

  const {
    register: assignorRegister,
    // handleSubmit: handleAssignorSubmit,
    // formState: { isSubmitting: isAssignorSubmitting },
  } = useForm<EditAssignorForm>({
    values: {
      document,
      email,
      name,
      phone,
    },
  })

  const handleAssignorEdit = () => {
    setIsAssignorEditable(!isAssignorEditable)
  }

  return (
    <>
      <h3 className="font-bold">Cedente:</h3>
      <Table className="-mt-1">
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Nome</TableCell>
            <TableCell className="flex justify-end">
              {isPayableLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : isAssignorEditable ? (
                <Input className="h-6 w-36" {...assignorRegister('name')} />
              ) : (
                name
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              {isPayableLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : isAssignorEditable ? (
                <Input className="h-6 w-36" {...assignorRegister('phone')} />
              ) : (
                phone
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Email</TableCell>
            <TableCell className="flex justify-end">
              {isPayableLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : isAssignorEditable ? (
                <Input className="h-6 w-36" {...assignorRegister('email')} />
              ) : (
                email
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Documento</TableCell>
            <TableCell className="flex justify-end">
              {isPayableLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : isAssignorEditable ? (
                <Input className="h-6 w-36" {...assignorRegister('document')} />
              ) : (
                document
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

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
  )
}

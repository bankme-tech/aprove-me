import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAppContext } from '@/hooks/use-app-context'

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
  const navigate = useNavigate()

  const { editAssignorFn, deleteAssignorFn } = useAppContext()
  const [isAssignorEditable, setIsAssignorEditable] = useState(false)

  const { data: payableDetail, isLoading: isPayableLoading } =
    useQuery<GetPayableBody>({
      queryKey: ['payable-detail', payableId],
      queryFn: () => getPayable(payableId),
      staleTime: Infinity, // Em quanto tempo essa informação se torna obsoleta,
      enabled: !!payableId, // Habilita a query apenas se payableId estiver disponível
    })

  const {
    payableWithAssignor: {
      assignor: {
        id = '',
        name = '',
        phone = '',
        email = '',
        document = '',
      } = {},
    } = {},
  } = payableDetail || {}

  const {
    register: assignorRegister,
    handleSubmit,
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

  const handleEditSubmition = async ({
    document,
    email,
    name,
    phone,
  }: EditAssignorForm) => {
    if (!document || !email || !name || !phone) {
      toast.error('Nenhum campo pode estar vazio para realizar a edição.')
    } else {
      try {
        await editAssignorFn({ id, document, email, name, phone, payableId })

        handleAssignorEdit()
      } catch (error) {
        console.error(error)
        toast.error('Erro ao editar o recebível.')
      }
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAssignorFn(id)
      navigate(0)
    } catch {
      toast.error('Erro ao deletar o recebível.')
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-bold">Cedente:</h3>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-red-700" variant={'link'}>
              <Trash2 className="h-6 w-6 " />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Quer mesmo deletar este{' '}
                <span className="text-red-700">cedente?</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso vai deletar
                permanentemente o cedente e remover os dados do servidor.
                <br />
                <br /> Além disso, todos os recebíeis atrelado a este cedente
                serão também excluidos permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="bg-red-600  text-white"
                  onClick={handleDelete}
                >
                  Prosseguir mesmo assim
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
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
      <section className="flex flex-col gap-1">
        <div className="flex justify-evenly gap-1">
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

          {isAssignorEditable && (
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
                    permanentemente os dados do cedente no servidor.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="bg-red-600  text-white"
                      onClick={
                        isAssignorEditable
                          ? handleSubmit(handleEditSubmition)
                          : handleAssignorEdit
                      }
                    >
                      Continuar
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </section>
    </>
  )
}

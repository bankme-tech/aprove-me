import { useQuery } from '@tanstack/react-query'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getPayable, GetPayableBody } from '@/api/get-payable'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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

export const PayableDetails = ({ payableId }: PayableDetailsProps) => {
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
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>

                <TableFooter>
                  <TableRow>
                    <TableCell className="flex gap-5">
                      <p>Data:</p>
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-12" />
                      ) : (
                        format(new Date(emissionDate), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-12" />
                      ) : (
                        value?.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>

              <h3 className="font-bold">Cedente:</h3>
              <Table className="-mt-5">
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Nome
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {isPayableLoading ? (
                        <Skeleton className="h-4 w-32" />
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
                      ) : (
                        document
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section className="flex flex-col gap-1">
              <Button
                className="bg-amber-500 font-bold text-black  hover:bg-blue-600 hover:text-white dark:bg-amber-400 dark:hover:bg-blue-600"
                size={'xs'}
              >
                Editar
              </Button>

              <Button
                className="hover:bg-blue-600"
                variant={'destructive'}
                size={'lg'}
              >
                Deletar Recebível
              </Button>
            </section>
          </>
        )}
      </DialogContent>
    </>
  )
}

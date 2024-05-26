import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { PayableDetails } from './payable-details'

export interface PayableTableRowProps {
  payable: {
    id: string
    value: number
    emissionDate: Date
    assignorId: string
  }
}

export const PayableTableRow = ({ payable }: PayableTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              // variant="ghost"
              // variant="outline"
              size="xs"
            >
              <Info className="h-5 w-5" />
              <span className="sr-only">detalhes do cedente</span>
            </Button>
          </DialogTrigger>

          <PayableDetails />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {payable.id}
      </TableCell>

      <TableCell className="flex flex-col text-center">
        {format(new Date(payable.emissionDate), 'dd/MM/yyyy', { locale: ptBR })}
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(payable.emissionDate, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </TableCell>

      <TableCell className="text-right font-medium">
        {payable.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    </TableRow>
  )
}

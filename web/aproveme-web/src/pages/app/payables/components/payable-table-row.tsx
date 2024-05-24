import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { PayableDetails } from './payable-details'

export interface PayableTableRowProps {
  payable: {
    id: string
    value: number
    emissionDate: string
    assignorId: string
  }
}

export const PayableTableRow = ({ payable }: PayableTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">detalhes do cedente</span>
            </Button>
          </DialogTrigger>

          <PayableDetails />
        </Dialog>
      </TableCell>

      <TableCell className="text-center font-mono text-xs font-medium">
        {payable.id}
      </TableCell>

      <TableCell className="text-center text-muted-foreground">
        {formatDistanceToNow(payable.emissionDate, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell className="font-medium">{payable.assignorId}</TableCell>

      <TableCell className="text-right font-medium">
        {payable.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    </TableRow>
  )
}

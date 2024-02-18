import { DeleteItemTable } from '@/components/delete-item-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Api } from '@/services/api';
import { Receivable } from '@/types/receivable';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { EditReceivableForm } from './edit-receivable-form';
import { ShowReceivable } from './show-receivable';

export const ReceivableTable = () => {
  const { data } = useQuery({
    queryKey: ['receivable-table'],
    queryFn: Api.fetchReceivables,
  });

  const renderTable = (receivable: Receivable) => (
    <TableRow key={receivable.id}>
      <TableCell>
        <ShowReceivable id={receivable.id} />
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {receivable.id}
      </TableCell>

      <TableCell className="font-mono text-xs font-bold">
        {receivable.value}
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {format(new Date(receivable.emission_date), 'HH:mm dd/MM/yyyy')}
      </TableCell>

      <TableCell>
        <EditReceivableForm />
      </TableCell>

      <TableCell>
        <DeleteItemTable id={receivable.id} />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Identificador</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data de emissão</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((receivable) => renderTable(receivable))}
        </TableBody>
      </Table>
    </div>
  );
};

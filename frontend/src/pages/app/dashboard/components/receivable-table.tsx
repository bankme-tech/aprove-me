import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { ArrowRight, Pencil, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReceivableTable = () => {
  const renderTable = (data: any) => (
    <TableRow key={data}>
      <TableCell>
        <Button size="sm" variant="outline" asChild>
          <Link to="">
            <ArrowRight className="size-3" />
            <span className="sr-only">ir para detalhes</span>
          </Link>
        </Button>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        832fd66e-7ea4-44f8-8770-f9ace6c6ece3
      </TableCell>

      <TableCell className="font-mono text-xs font-bold">3293</TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {new Date().toISOString()}
      </TableCell>

      <TableCell>
        <Button size="sm" variant="outline">
          <Pencil className="size-3" />
          <span className="sr-only">editar</span>
        </Button>
      </TableCell>

      <TableCell>
        <Button size="sm" variant="destructive">
          <Trash className="size-3" />
          <span className="sr-only">deletar</span>
        </Button>
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
          {Array.from({ length: 10 }).map((_, i) => renderTable(i))}
        </TableBody>
      </Table>
    </div>
  );
};

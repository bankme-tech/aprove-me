import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatCurrency";
import { usePayableStore } from "@/stores/usePayableStore";
import { useEffect } from "react";
import { PayableMenu } from "./payableMenu";
import { TablePagination } from "@/components/pagination/pagination";

export const PayablesTable = () => {
  const payable = usePayableStore();

  useEffect(() => {
    payable.findAllPayables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payable.skip, payable.take]);

  const renderTableContent = () =>
    payable.payables.map((payable) => (
      <TableRow key={payable._id}>
        <TableCell>{payable._id}</TableCell>

        <TableCell>{formatCurrency(payable.props.value)}</TableCell>

        <TableCell>
          {new Date(payable.props.emissionDate).toLocaleDateString()}
        </TableCell>

        <TableCell className="flex w-full justify-end gap-2">
          <PayableMenu payable={payable} />
        </TableCell>
      </TableRow>
    ));

  const renderTableSkeleton = () =>
    Array.from(Array(5)).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-8 w-32 rounded-md" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-8 w-full rounded-md" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-8 w-full rounded-md" />
        </TableCell>

        <TableCell className="flex w-full justify-end gap-2">
          <Skeleton className="size-8 rounded-md" />
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="rounded-md overflow-hidden w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identificador</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Data de emissão</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payable.status === "loading"
            ? renderTableSkeleton()
            : renderTableContent()}

          {payable.payables.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Vazia no momento, adicione algum recebível para aparecer aqui!
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell className="py-0" colSpan={4}>
              <TablePagination
                prevPage={payable.decreaseSkip}
                nextPage={payable.increaseSkip}
                currentPage={payable.currentPage}
                totalPages={payable.totalPages}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

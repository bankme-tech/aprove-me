"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PayableDropdown from "./payable-dropdown";
import { useGetAllPayable } from "@/hooks/useGetAllPayable";
import { formatDate } from "@/utils/date-formatter";

export default function PayableTable() {
  const { data, isPending } = useGetAllPayable();

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <Table>
      <TableCaption>List of payables</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>value</TableHead>
          <TableHead>emission date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((payable) => (
          <TableRow key={payable.id}>
            <TableCell>{payable.id}</TableCell>
            <TableCell>{payable.value}</TableCell>
            <TableCell>{formatDate(payable.emissionDate)}</TableCell>
            <TableCell className="flex items-center gap-5">
              <PayableDropdown payable={payable} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client";
import PayableDropdown from "@/components/payable-dropdown";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreatePayableForm from "@/components/create-payable";
import { useGetAllPayable } from "@/hooks/useGetAllPayable";
import { formatDate } from "@/utils/date-formatter";

export default function page() {
  const { data, isPending } = useGetAllPayable();

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <div className="min-h-screen container flex flex-col justify-center">
      <div className="flex self-start my-4">
        <CreatePayableForm />
      </div>
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
    </div>
  );
}

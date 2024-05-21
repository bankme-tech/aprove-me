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
import { useGetAllAssignor } from "@/hooks/useGetAllAssignor";

export default function AssignorTable() {
  const { data, isPending } = useGetAllAssignor();

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <Table>
      <TableCaption>List of assignors</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>name</TableHead>
          <TableHead>email</TableHead>
          <TableHead>document</TableHead>
          <TableHead>phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((assignor) => (
          <TableRow key={assignor.id}>
            <TableCell>{assignor.id}</TableCell>
            <TableCell>{assignor.name}</TableCell>
            <TableCell>{assignor.email}</TableCell>
            <TableCell>{assignor.document}</TableCell>
            <TableCell>{assignor.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

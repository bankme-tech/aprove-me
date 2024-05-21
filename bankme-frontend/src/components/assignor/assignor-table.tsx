"use client";
import Link from "next/link";
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
import { buttonVariants } from "@/components/ui/button";

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
            <TableCell>
              <Link
                href={`/assignor/${assignor.id}`}
                className={buttonVariants({ variant: "link" })}
              >
                Details
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

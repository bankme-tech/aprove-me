"use client";
import Link from "next/link";
import { useListPayable } from "@/hooks/useListPayable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function Page() {
  const { payables } = useListPayable();
  console.log(payables);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Lista de Pagáveis</h1>
      <Table>
        <TableCaption>LIsta de todos seus pagáveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Data de emissão</TableHead>
            <TableHead>Assinante</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payables?.map((payable:any)=>(
            <TableRow>
            <TableCell className="font-medium">
              <Link href={`/list-payable/${payable.id}`}>
              {payable.id}
              </Link>
            </TableCell>
            <TableCell>{payable.emissionDate}</TableCell>
            <TableCell>{payable.assignor}</TableCell>
            <TableCell className="text-right">${payable.value}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

'use client'

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { listPayables } from "@/lib/server/routes/list-payables";
import { getToken } from "@/lib/utils/token";
import { useQuery } from "@tanstack/react-query";
import { RedirectType, redirect } from "next/navigation";

export const TableListPayables: React.FunctionComponent = () => {
    const token = getToken() 

    if(!token) redirect('/', RedirectType.replace)

    const { data } = useQuery({
        queryKey: ['payables'],
        queryFn: () => listPayables({ token }),
        retry: false,
        refetchOnWindowFocus: false
    })

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data de emissão</TableHead>
                    <TableHead>Visualizar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map(payable => (
                    <TableRow key={payable.id}>
                        <TableCell>{payable.id}</TableCell>
                        <TableCell>{formatPrice(payable.value)}</TableCell>
                        <TableCell>{formatDate(new Date(payable.emissionDate))}</TableCell>
                        <TableCell>
                            <Button variant='link' size='icon' asChild>
                                <Link href={`/payables/${payable.id}`}>
                                    <Eye className="h-5 w-5" />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
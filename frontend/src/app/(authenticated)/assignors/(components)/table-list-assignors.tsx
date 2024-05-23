'use client'

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { getToken, removeToken } from "@/lib/utils/token";
import { listAssignors } from "@/lib/server/routes/list-assignors";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {RedirectType, redirect} from "next/navigation";

export const TableListAssignors: React.FunctionComponent = () => {
    const token = getToken()

    if(!token) redirect('/', RedirectType.replace)

    const { data: assignors, isError, error } = useQuery({
        queryKey: ['assignors'],
        queryFn: () => listAssignors({token}),
        retry: false,
        refetchOnWindowFocus: false
    })

    if (isError) {
        if(error.cause === 'Unauthorized'){
                removeToken()
                redirect('/', RedirectType.replace)
            }
        toast.error(error.message)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Visualizar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignors?.map(assignor => (
                    <TableRow key={assignor.id}>
                        <TableCell>{assignor.id}</TableCell>
                        <TableCell>{assignor.name}</TableCell>
                        <TableCell>{assignor.email}</TableCell>
                        <TableCell>
                            <Button variant='link' size='icon' asChild>
                                <Link href={`/assignors/${assignor.id}`}>
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
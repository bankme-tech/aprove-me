'use client'

import { deletePayable } from "@/lib/server/routes/delete-payable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RedirectType, redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/lib/utils/token";
import { queryClient } from "@/providers/client-react-query";

interface DeletePayableProps {
    payableId: string
}

export const DeletePayable: React.FunctionComponent<DeletePayableProps> = ({ payableId }) => {
    const token = getToken()
    const router = useRouter()

    if(!token) redirect('/', RedirectType.replace)

    const {mutate, isPending} = useMutation({
        mutationFn: () => deletePayable(payableId, {token}),
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['payables'], exact: true})
            toast.success('Pagável removido com sucesso!')
            router.replace('/payables')
        },
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button type='button' variant='ghost'>Remover</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Essa ação não poderá ser desfeita. Este pagável vai ser deletado permanentemente.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                    Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
                    Remover
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
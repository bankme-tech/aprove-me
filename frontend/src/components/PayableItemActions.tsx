'use client'

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PayableForm from "./PayableForm";
import { useContext, useState } from "react";
import { BASE_URL } from "@/contants";
import { readCookie } from "@/helpers/cookie";
import { ToastContext } from "@/contexts/ToastContext";

type Payable = {
    id: string
    value: number
    emissionDate: string
    assignorId: string
}

const PayableItemActions = (payable: Payable) => {
    const router = useRouter();

    const { showToast } = useContext(ToastContext);

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDialog = () => {
        setOpen(value => !value);
    }

    const handleSuccess = () => {
        toggleDialog();
        showToast('success', 'Sucesso!', 'Informações armazenadas com sucesso!');
        router.refresh();
    }

    const handleError = (message: string[]) => {
        for (let i = 0; i < message.length; i++) {
            showToast('error', 'Erro!', message[i]);
        }
    }

    const handleRemove = async () => {
        try {
            setIsLoading(true);

            const token = readCookie('bankme.token');

            const res = await fetch(`${BASE_URL}/integrations/payable/${payable.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'DELETE',
            });
            const result = await res.json();

            if (result?.statusCode === 401) {
                router.push("/");
                return;
            }

            if (result?.error) {
                showToast('error', 'Erro!', result.message);
                return;
            }

            showToast('success', 'Sucesso!', 'Cedente removido com sucesso!');

            router.refresh();
        } catch (e: any) {
            showToast('error', 'Erro!', e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Dialog
                header="Editar cedente"
                visible={open}
                onHide={toggleDialog}
                className="w-full max-w-md"
            >
                <PayableForm payable={payable} onSuccess={handleSuccess} onError={handleError} />
            </Dialog>

            <div className="flex items-center justify-end gap-4">
                <Button icon="pi pi-eye" rounded onClick={() => router.push(`/payables/${payable.id}`)} />
                <Button icon="pi pi-pencil" rounded onClick={toggleDialog} />
                <Button icon="pi pi-trash" severity="danger" rounded onClick={handleRemove} loading={isLoading} />
            </div>
        </div>
    )
}

export default PayableItemActions;
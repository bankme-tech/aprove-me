'use client'

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AssignorForm from "./AssignorForm";
import { useContext, useState } from "react";
import { BASE_URL } from "@/contants";
import { readCookie } from "@/helpers/cookie";
import { ToastContext } from "@/contexts/ToastContext";

type Assignor = {
    id: string
    name: string
    email: string
    phone: string
    document: string
}

const AssignorItemActions = (assignor: Assignor) => {
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
        console.log(message);
        for (let i = 0; i < message.length; i++) {
            showToast('error', 'Erro!', message[i]);
        }
    }

    const handleRemove = async () => {
        try {
            setIsLoading(true);

            const token = readCookie('bankme.token');

            const res = await fetch(`${BASE_URL}/integrations/assignor/${assignor.id}`, {
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
                <AssignorForm assignor={assignor} onSuccess={handleSuccess} onError={handleError} />
            </Dialog>

            <div className="flex items-center justify-end gap-4">
                <Button icon="pi pi-eye" rounded onClick={() => router.push(`/assignors/${assignor.id}`)} />
                <Button icon="pi pi-pencil" rounded onClick={toggleDialog} />
                <Button icon="pi pi-trash" severity="danger" rounded onClick={handleRemove} loading={isLoading} />
            </div>
        </div>
    )
}

export default AssignorItemActions;
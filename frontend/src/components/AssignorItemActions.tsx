'use client'

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AssignorForm from "./AssignorForm";
import { useState } from "react";
import { BASE_URL } from "@/contants";

interface AssignorItemActionsProps {
    assignor: {
        id: string
        name: string
        document: string
        email: string
        phone: string
    },
    showToast: (severity: string, summary: string, detail: string) => void
}

const AssignorItemActions = (props: AssignorItemActionsProps) => {
    const { assignor, showToast } = props;

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDialog = () => {
        setOpen(value => !value);
    }

    const handleOnSuccess = () => {
        toggleDialog();
        showToast('success', 'Sucesso!', 'Informações armazenadas com sucesso!');
        router.refresh();
    }

    const handleRemove = async () => {
        try {
            setIsLoading(true);

            const token = localStorage.getItem('token');

            const res = await fetch(`${BASE_URL}/integrations/assignor/${assignor.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'DELETE',
            });
            const result = await res.json();

            if(result?.statusCode === 401) {
                router.push("/");
                return;
            }

            if(result?.error) {
                showToast('error', 'Erro!', result.message);
                return;
            }
            
            showToast('success', 'Sucesso!', 'Cedente removido com sucesso!');

            router.refresh();
        } catch(e: any) {
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
                <AssignorForm assignor={assignor} onSuccess={handleOnSuccess} />
            </Dialog>

            <div className="flex items-center gap-4">
                <Button icon="pi pi-eye" rounded onClick={() => router.push(`/assignors/${assignor.id}`)} />
                <Button icon="pi pi-pencil" rounded onClick={toggleDialog} />
                <Button icon="pi pi-trash" severity="danger" rounded onClick={handleRemove} loading={isLoading} />
            </div>
        </div>
    )
}

export default AssignorItemActions;
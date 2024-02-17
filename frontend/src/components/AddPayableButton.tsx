'use client';

import { useContext, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PayableForm from "./PayableForm";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/contexts/ToastContext";

const AddPayableButton = () => {
    const router = useRouter();

    const { showToast } = useContext(ToastContext);

    const [open, setOpen] = useState(false);

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

    return (
        <div>
            <Dialog
                visible={open}
                onHide={toggleDialog}
                header="Criar novo recebível"
                className="w-full max-w-md"
            >
                <PayableForm onSuccess={handleSuccess} onError={handleError} />
            </Dialog>

            <Button label="Novo" onClick={toggleDialog} />
        </div>

    )
}

export default AddPayableButton;
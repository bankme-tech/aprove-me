'use client';

import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PayableForm from "./PayableForm";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";

const AddPayableButton = () => {
    const toastRef = useRef<any>();

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const toggleDialog = () => {
        setOpen(value => !value);
    }

    const showToastSuccess = () => {
        toastRef.current.show({
            severity: 'success', summary: 'Sucesso!', detail: 'Informações armazenadas com sucesso!'
        });
    }

    const handleOnSuccess = () => {
        toggleDialog();
        showToastSuccess();
        router.refresh();
    }

    return (
        <div>
            <Toast ref={toastRef} />
            <Dialog
                visible={open}
                onHide={toggleDialog}
                header="Criar novo recebível"
                className="w-full max-w-md"
            >
                <PayableForm onSuccess={handleOnSuccess} />
            </Dialog>

            <Button label="Novo" onClick={toggleDialog} />
        </div>

    )
}

export default AddPayableButton;
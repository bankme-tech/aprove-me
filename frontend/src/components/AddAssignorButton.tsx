'use client';

import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AssignorForm from "./AssignorForm";
import { useRouter } from "next/navigation";

const AddAssignorButton = () => {
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
            <Dialog
                visible={open}
                onHide={toggleDialog}
                header="Criar novo cedente"
                className="w-full max-w-md"
            >
                <AssignorForm onSuccess={handleOnSuccess} />
            </Dialog>

            <Button label="Novo" onClick={toggleDialog} />
        </div>

    )
}

export default AddAssignorButton;
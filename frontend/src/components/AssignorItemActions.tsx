'use client'

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AssignorForm from "./AssignorForm";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";

interface AssignorItemActionsProps {
    assignor: {
        id: string
        name: string
        document: string
        email: string
        phone: string
    }
}

const AssignorItemActions = (props: AssignorItemActionsProps) => {
    const toastRef = useRef<any>();

    const { assignor } = props;

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
    }

    return (
        <div>
            <Toast ref={toastRef} />

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
                <Button icon="pi pi-trash" severity="danger" rounded />
            </div>
        </div>
    )
}

export default AssignorItemActions;
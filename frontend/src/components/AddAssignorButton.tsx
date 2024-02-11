'use client';

import { useState } from "react";
import CreateAssignorDialog from "./CreateAssignorDialog";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AssignorForm from "./AssignorForm";

const AddAssignorButton = () => {

    const [open, setOpen] = useState(false);

    const toggleDialog = () => {
        setOpen(value => !value);
    }

    return (
        <div>
            <Dialog
                visible={open}
                onHide={toggleDialog}
                header="Criar novo cedente"
                className="w-full max-w-md"
            >
                <AssignorForm />
            </Dialog>

            <Button label="Novo" onClick={toggleDialog} />
        </div>

    )
}

export default AddAssignorButton;
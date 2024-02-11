'use client';

import { useState } from "react";
import CreateAssignorDialog from "./CreateAssignorDialog";
import { Button } from "primereact/button";

const AddAssignorButton = () => {

    const [visible, setVisible] = useState(false);

    const toggleDialog = () => {
        setVisible(value => !value);
    }

    return (
        <div>
            <CreateAssignorDialog visible={visible} toggleDialog={toggleDialog} />

            <Button label="Novo" onClick={toggleDialog} />
        </div>

    )
}

export default AddAssignorButton;
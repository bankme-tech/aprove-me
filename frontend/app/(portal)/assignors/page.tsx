'use client';

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { getAssignors } from "./_actions/get-assignors";

const Assignors = () => {

    const [assignors, setAssignors] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDialog = () => {
        setVisible(value => !value);
    }

    const handleClick = async () => {
        setIsLoading(true);

        const token = localStorage.getItem('token');

        if(!token) {
            return;
        }

        const result = await getAssignors(token);

        console.log(result);

        setIsLoading(false);
    }

    return (
        <>
            <Dialog
                visible={visible}
                onHide={toggleDialog}
                header="Criar novo cedente"
                className="w-full max-w-[600px] m-4"
            >

            </Dialog>

            <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl font-bold">Cedentes</h1>

                <div className="flex items-center gap-4">
                    <Button label="Novo" onClick={toggleDialog} />
                    <Button label="Listar" onClick={handleClick} loading={isLoading} />
                </div>
            </div>

            <DataTable
                className="w-full"
                value={assignors}
                showGridlines
            >
                <Column header="Nome" field="name" />
                <Column header="Documento" field="document" />
                <Column header="Email" field="email" />
                <Column header="Telefone" field="phone" />
                <Column header="Ações" field="" body={() => (
                    <div className="flex items-center gap-4">
                        <Button icon="pi pi-pencil" />
                        <Button icon="pi pi-trash" severity="danger" />
                    </div>
                )} />
            </DataTable>
        </>
    )
}

export default Assignors;
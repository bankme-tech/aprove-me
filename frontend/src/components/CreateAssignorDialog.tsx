'use client';

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BASE_URL } from "@/contants";
import Input from "./Input";
import { useRouter } from "next/navigation";

const CreateAssignorDialog = ({ visible, toggleDialog }: {
    visible: boolean, toggleDialog: () => void
}) => {

    const router = useRouter();

    const toastRef = useRef<any>(null);

    const { control, handleSubmit, formState: { errors } } = useForm();

    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const showToastError = (message: string) => {
        toastRef.current.show({
            severity: 'error', summary: 'Error!', detail: message
        });
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            setIsSubmitLoading(true);

            const token = localStorage.getItem('token');

            const res = await fetch(`${BASE_URL}/integrations/assignor`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'post',
                body: JSON.stringify(data)
            });
            
            const result = await res.json();

            router.push(`/assignors/${result.id}`);

            toggleDialog();
        } catch (e: any) {
            showToastError(e.message);
        } finally {
            setIsSubmitLoading(false);
        }
    }

    return (
        <Dialog
            visible={visible}
            onHide={toggleDialog}
            header="Criar novo cedente"
            className="w-full max-w-[500px] m-4"
        >
            <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label="Nome"
                    name="name"
                    errors={errors}
                    control={control}
                    rules={{ required: "Nome obrigatório" }}
                />
                <Input
                    label="Email"
                    name="email"
                    errors={errors}
                    control={control}
                    rules={{ required: "Email obrigatório" }}
                />
                <Input
                    label="Telefone"
                    name="phone"
                    errors={errors}
                    control={control}
                    rules={{ required: "Telefone obrigatório" }}
                />
                <Input
                    label="CPF"
                    name="document"
                    errors={errors}
                    control={control}
                    rules={{ required: "CPF obrigatório" }}
                />
                <div className="flex justify-end">
                    <Button
                        label="Salvar"
                        loading={isSubmitLoading}
                        type="submit"
                    />
                </div>
            </form>
        </Dialog>
    )
}

export default CreateAssignorDialog;
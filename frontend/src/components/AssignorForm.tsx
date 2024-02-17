'use client';

import { useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "primereact/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { readCookie } from "@/helpers/cookie";
import { BASE_URL } from "@/contants";

interface Assignor {
    id: string
    name: string
    document: string
    email: string
    phone: string
}

const AssignorForm = ({ assignor, onSuccess, onError }: {
    assignor?: Assignor, onSuccess: () => void, onError: (message: string[]) => void
}) => {

    let defaultValues;
    
    if(assignor) {
        defaultValues = {
            id: assignor.id,
            name: assignor.name,
            document: assignor.document,
            email: assignor.email,
            phone: assignor.phone,
        }
    }

    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });

    const onSubmit = async (data: any) => {
        try {
            setIsSubmitLoading(true);

            const token = readCookie('bankme.token');

            const res = await fetch(`${BASE_URL}/integrations/assignor`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                method: data.id ? 'PATCH' : 'POST',
                body: JSON.stringify(data)
            });
            const {error, message, statusCode} = await res.json();

            if(error) {
                onError(message);
                return;
            }

            if(statusCode === 401) {
                onError([message]);
                return;
            }

            onSuccess();
        } catch(e: any) {
        } finally {
            setIsSubmitLoading(false);
        }
    }

    return (
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
    )
}

export default AssignorForm;
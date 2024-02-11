import { useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { BASE_URL } from "@/contants";

interface Assignor {
    id: string
    name: string
    document: string
    email: string
    phone: string
}

const AssignorForm = ({ assignor, onSuccess }: {
    assignor?: Assignor, onSuccess: () => void
}) => {
    const toastRef = useRef<any>();

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

    const showToastError = (message: string) => {
        toastRef.current.show({
            severity: 'error', summary: 'Erro!', detail: message
        });
    }

    const onSubmit = async (data: any) => {
        try {
            setIsSubmitLoading(true);

            const token = localStorage.getItem('token');

            let method = 'POST';

            if(data.id) {
                method = 'PATCH';
            }

            const res = await fetch(`${BASE_URL}/integrations/assignor`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method,
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if(result?.error) {
                for(let i = 0; i < result.message.length; i++) {
                    showToastError(result.message[i]);
                }
                return;
            }

            onSuccess();
        } catch(e: any) {
            showToastError(e.message);
        } finally {
            setIsSubmitLoading(false);
        }
    }

    return (
        <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Toast ref={toastRef} />
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
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "primereact/button";
import { useState } from "react";

interface Assignor {
    id: string
    name: string
    document: string
    email: string
    phone: string
}

const AssignorForm = ({ assignor }: {
    assignor?: Assignor
}) => {

    let defaultValues;
    
    if(assignor) {
        defaultValues = {
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

    const onSubmit = (data: any) => {
        console.log(data);
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
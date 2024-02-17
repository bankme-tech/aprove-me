'use client';

import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { readCookie } from "@/helpers/cookie";
import { BASE_URL } from "@/contants";
import InputNumber from "./InputNumber";
import InputComboBox from "./InputComboBox";

interface Payable {
    id: string
    value: number
    emissionDate: string
    assignorId: string
}

const PayableForm = ({ payable, onSuccess, onError }: {
    payable?: Payable, onSuccess: () => void, onError: (message: string[]) => void
}) => {

    let defaultValues;

    if (payable) {
        defaultValues = {
            id: payable.id,
            value: payable.value,
            emissionDate: payable.emissionDate,
            assignorId: payable.assignorId,
        }
    }

    useEffect(() => {
        getAssignors();
    }, []);

    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [assignors, setAssignors] = useState([]);
    const [assignor, setAssignor] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });

    const getAssignors = async () => {
        const token = readCookie('bankme.token');

        const res = await fetch(`${BASE_URL}/integrations/assignor`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();

        setAssignors(data);
    }

    const onSubmit = async (data: any) => {
        try {
            setIsSubmitLoading(true);

            const token = readCookie('bankme.token');

            const res = await fetch(`${BASE_URL}/integrations/payable`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                method: data.id ? 'PATCH' : 'POST',
                body: JSON.stringify(data)
            });
            const { error, message, statusCode } = await res.json();

            if (error) {
                onError(message);
                return;
            }

            if (statusCode === 401) {
                onError([message]);
                return;
            }

            onSuccess();
        } catch (e: any) {
        } finally {
            setIsSubmitLoading(false);
        }
    }

    return (
        <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputNumber
                label="Valor"
                name="value"
                errors={errors}
                control={control}
                rules={{ required: "Valor obrigatório" }}
                mode="currency"
                currency="BRL"
            />
            <InputComboBox
                label="Cedente"
                name="assignorId"
                optionLabel="name"
                optionValue="id"
                options={assignors}
                placeholder="Selecione um Cedente"
                control={control}
                errors={errors}
                rules={{ required: "Cedente obrigatório" }}
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

export default PayableForm;
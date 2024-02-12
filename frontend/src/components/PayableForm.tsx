'use client';

import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Suspense, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { BASE_URL } from "@/contants";
import InputNumber from "./InputNumber";
import InputCalendar from "./InputCalendar";
import AssignorsComboBox from "./AssignorsComboBox";
import { Dropdown } from "primereact/dropdown";

interface Payable {
    id: string
    value: number
    emissionDate: Date
    assignorId: string
}

const PayableForm = ({ payable, onSuccess }: {
    payable?: Payable, onSuccess: () => void
}) => {
    const toastRef = useRef<any>();

    let defaultValues;

    if (payable) {
        defaultValues = {
            id: payable.id,
            value: payable.value,
            emissionDate: new Date(payable.emissionDate),
            assignorId: payable.assignorId
        }
    }

    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

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

            let method = 'POST';

            if (data.id) {
                method = 'PATCH';
            }

            const res = await fetch(`${BASE_URL}/integrations/payable`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method,
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result?.error) {
                for (let i = 0; i < result.message.length; i++) {
                    showToastError(result.message[i]);
                }
                return;
            }

            onSuccess();
        } catch (e: any) {
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
            <InputNumber
                label="Valor"
                name="value"
                errors={errors}
                control={control}
                rules={{ required: "Valor obrigatório" }}
                mode="currency"
                currency="BRL"
            />
            <InputCalendar
                label="Data de emissão"
                name="emissionDate"
                control={control}
                errors={errors}
                rules={{ required: "Data de emissão obrigatória" }}
            />
            <Suspense fallback={
                <div className="flex flex-col gap-1">
                    <label>Cedente</label>
                    <Dropdown
                        disabled
                        placeholder="Carregando..."
                    />
                </div>
            }>
                <AssignorsComboBox
                    control={control}
                    errors={errors}
                    token={token as string}
                />
            </Suspense>
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
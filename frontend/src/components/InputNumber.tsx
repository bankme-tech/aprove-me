'use client';

import { InputNumber as PInputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { Control, Controller, RegisterOptions } from "react-hook-form";

const InputNumber = ({ label, name, control, errors, rules, mode, currency }: {
    label: string
    name: string
    control?: Control<any>
    errors?: any
    rules?: Omit<RegisterOptions<any, "value">, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
    mode?: "currency" | "decimal" | undefined
    currency?: string
}) => {

    const getFormErrorMessage = (name: string) => {
        return errors[name] ? <small className="p-error">{`${errors[name]?.message}`}</small> : null;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className="w-full flex flex-col items-start gap-1">
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>{label}</label>
                    <PInputNumber id={field.name} value={field.value} className={`w-full ${classNames({ 'p-invalid': fieldState.error })}`} onChange={(e) => field.onChange(e.value)} mode={mode} currency={currency} />
                    {getFormErrorMessage(field.name)}
                </div>
            )}
        />
    )
}

export default InputNumber;
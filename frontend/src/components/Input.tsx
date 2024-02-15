'use client';

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";

const Input = ({ label, name, control, errors, rules, type }: {
    label: string
    name: string
    control?: Control<any>
    errors?: any
    rules?: Omit<RegisterOptions<any, "value">, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
    type?: string
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
                    <label htmlFor={field.name} className={`text-2xl lg:text-lg ${classNames({ 'p-error': errors.value })}`}>{label}</label>
                    <InputText id={field.name} value={field.value || ''} className={`w-full text-[20px] lg:text-lg ${classNames({ 'p-invalid': fieldState.error })}`} onChange={(e) => field.onChange(e.target.value)} type={type}/>
                    {getFormErrorMessage(field.name)}
                </div>
            )}
        />
    )
}

export default Input;
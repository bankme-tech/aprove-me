'use client';

import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { Control, Controller, RegisterOptions } from "react-hook-form";

const InputCalendar = ({ label, name, control, errors, rules }: {
    label: string
    name: string
    control?: Control<any>
    errors?: any
    rules?: Omit<RegisterOptions<any, "value">, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
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
                    <label htmlFor={field.name}>{label}</label>
                    <Calendar inputId={field.name} value={field.value} onChange={field.onChange} dateFormat="dd/mm/yy" className={`w-full ${classNames({ 'p-invalid': fieldState.error })}`} />
                    {getFormErrorMessage(field.name)}
                </div>
            )}
        />

    )
}

export default InputCalendar;
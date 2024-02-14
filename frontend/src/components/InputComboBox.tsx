'use client';

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Control, Controller, RegisterOptions } from "react-hook-form";

const InputComboBox = ({ label, name, control, errors, rules, optionLabel, optionValue,placeholder, options }: {
    label: string
    name: string
    control?: Control<any>
    errors?: any
    rules?: Omit<RegisterOptions<any, "value">, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
    optionLabel: string
    optionValue: string
    placeholder: string
    options: any[]
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
                <div className="w-full flex flex-col gap-1">
                    <label htmlFor={field.name}>{label}</label>
                    <Dropdown
                        filter
                        showFilterClear
                        showClear
                        value={field.value}
                        optionLabel={optionLabel}
                        optionValue={optionValue}
                        placeholder={placeholder}
                        options={options}
                        onChange={(e) => field.onChange(e.value)}
                        className={classNames({ 'p-invalid': fieldState.error })}
                        style={{width: '100%'}}
                    />
                    {getFormErrorMessage(field.name)}
                </div>
            )
            }
        />

    )
}

export default InputComboBox;
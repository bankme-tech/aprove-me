import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import React, { InputHTMLAttributes } from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { TextInput } from "../Text/TextInput";

export interface IDateInputProps {
  autoWidth?: boolean;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  disabledAfterDate?: string;
  disabledBeforeDate?: string;
  errors?: FieldErrors<FieldValues>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
  onChange?: (value?: string) => void;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
}

export const DateInput: React.FC<IDateInputProps> = ({
  autoWidth,
  control,
  disabled,
  disabledAfterDate,
  disabledBeforeDate,
  errors,
  inputProps,
  label,
  name,
  onChange,
  required,
  size: sizeDefault,
  validateProps
}) => {
  const size = sizeDefault ?? "large";

  const sizeStyle = {
    small: {
      inputGroup: `h-6 ${autoWidth ? "w-full" : "w-24"}`,
      input: `pl-1 mt-0.5 h-6 tag-h6 ${autoWidth ? "w-full" : "w-24"}`
    },
    large: {
      inputGroup: `h-8 ${autoWidth ? "w-full" : "w-32"}`,
      input: `pl-1 mt-1 h-8 tag-h3 ${autoWidth ? "w-full" : "w-32"}`
    }
  };

  return (
    <TextInput
      label={label}
      required={required}
      disabled={disabled}
      name={name}
      errors={errors}
      onChange={(v) => {
        if (onChange) onChange(v);
      }}
      validateProps={{
        ...validateProps,
        pattern: {
          message: "O valor não está no tipo data",
          value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
        }
      }}
      control={control}
      size={size}
      type="date"
      stylesInputOveride={sizeStyle[size].input}
      stylesInputGroupOveride={sizeStyle[size].inputGroup}
      inputProps={{
        ...inputProps,
        min: disabledAfterDate,
        max: disabledBeforeDate
      }}
    />
  );
};

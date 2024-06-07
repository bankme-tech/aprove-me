import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import React from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { TextInput } from "../Text/TextInput";

export interface IEmailInputProps {
  autoWidth?: boolean;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
}

export const EmailInput: React.FC<IEmailInputProps> = ({
  autoWidth,
  control,
  disabled,
  errors,
  label,
  name,
  placeholder,
  required,
  size: sizeDefault,
  validateProps
}) => {
  const size = sizeDefault ?? "large";

  return (
    <TextInput
      label={label}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      validateProps={{
        ...validateProps,
        pattern: {
          value: /^[a-z0-9.]+@[a-zA-z]+\.[a-z]/i,
          message: "O valor no campo não está como email"
        }
      }}
      control={control}
      autoWidth={autoWidth}
      size={size}
      type="email"
      errors={errors}
    />
  );
};

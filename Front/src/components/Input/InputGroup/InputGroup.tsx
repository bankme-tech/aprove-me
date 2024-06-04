import { CurrencyInput } from "components/Input/Inputs/Currency/CurrencyInput";
import { DateInput } from "components/Input/Inputs/Date/DateInput";
import { EmailInput } from "components/Input/Inputs/Email/EmailInput";
import { MaskedInput } from "components/Input/Inputs/MaskedInput/MaskedInput";
import { PasswordInput } from "components/Input/Inputs/Password/Simple/PasswordInput";
import { SelectInline } from "components/Input/Inputs/Select/SelectInline";
import { TextInput } from "components/Input/Inputs/Text/TextInput";
import { IPageFormsInput } from "interfaces/interfaces/Inputs/IPageFormsInput";

import React from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

interface IInputGroupProps {
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
  inputColumn: IPageFormsInput[];
}

export const InputGroup: React.FC<IInputGroupProps> = ({
  control,
  errors,
  inputColumn
}) => {
  const verifyDisabled = (label: string, disabled?: boolean | undefined) =>
    disabled && control._formValues[label] !== undefined;

  return (
    <div className="flex h-fit w-full max-w-xs flex-col gap-6 pb-4">
      {inputColumn.map((input) => (
        <div key={`${input.label}${input.type}`}>
          {input.type === "title" && (
            <h1 className="tag-h1 my-0 text-purple-0">
              {input.label === "" ? <br /> : input.label}
            </h1>
          )}

          {input.type === "password" && (
            <PasswordInput
              autoWidth
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              name={input?.name ?? input.label}
              control={control}
              required={input?.required}
            />
          )}
          {input.type === "text" && (
            <TextInput
              autoWidth
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              name={input?.name ?? input.label}
              placeholder={input?.placeholder}
              control={control}
              required={input?.required}
            />
          )}
          {input.type === "mask" && (
            <MaskedInput
              autoWidth
              control={control}
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              maskType={input?.maskType}
              name={input?.name ?? input.label}
              placeholder={input.placeholder}
              required={input?.required}
            />
          )}
          {input.type === "currency" && (
            <CurrencyInput
              autoWidth
              control={control}
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              name={input?.name ?? input.label}
              placeholder={input.placeholder}
              required={input?.required}
            />
          )}
          {input.type === "email" && (
            <EmailInput
              autoWidth
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              name={input?.name ?? input.label}
              placeholder={input?.placeholder}
              control={control}
              required={input?.required}
            />
          )}
          {input.type === "date" && (
            <DateInput
              autoWidth
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              name={input?.name ?? input.label}
              control={control}
              required={input?.required}
            />
          )}
          {input.type === "select" && (
            <SelectInline
              autoWidth
              control={control}
              disabled={verifyDisabled(
                input?.name ?? input.label,
                input.disabled
              )}
              errors={errors}
              label={input.label}
              name={input?.name ?? input.label}
              options={input?.options ?? []}
              placeholder={input?.placeholder ?? ""}
              required={input?.required}
            />
          )}
        </div>
      ))}
    </div>
  );
};

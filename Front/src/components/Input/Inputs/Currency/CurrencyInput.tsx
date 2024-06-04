import { ErrorMessageInput } from "components/Text/InputTexts/ErrorMessageInput/ErrorMessageInput";
import { RequiredLabel } from "components/Text/InputTexts/RequiredLabel/RequiredLabel";
import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import React, { InputHTMLAttributes } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { NumberUtils } from "utils/numberUtils";

export interface ICurrencyInputProps {
  autoWidth?: boolean;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
}

export const CurrencyInput: React.FC<ICurrencyInputProps> = ({
  autoWidth,
  control,
  disabled,
  errors,
  inputProps,
  label,
  name,
  placeholder,
  required,
  size: sizeDefault,
  validateProps
}) => {
  const size = sizeDefault ?? "large";

  const sizeStyle = {
    small: {
      inputGroup: `h-6 ${autoWidth ? "w-auto" : "w-16"}`,
      input: `pl-[1.2rem] pt-1 h-6 tag-h6 ${autoWidth ? "w-auto" : "w-16"}`,
      children: "absolute left-1 bottom-[0.15rem]"
    },
    large: {
      inputGroup: `h-8 ${autoWidth ? "w-auto" : "w-24"}`,
      input: `pl-6 pt-1 h-8 tag-h3 ${autoWidth ? "w-auto" : "w-24"}`,
      children: "absolute left-1 bottom-[0.24rem]"
    }
  };
  const currencyTextStyle = disabled ? "text-gray-2" : "";

  const addDecimalIfNeeded = (value: string): string | undefined => {
    if (!value) return undefined;
    else if (!value.includes(".")) return `${value}.00`;
    else if (/.\d$/.test(value)) return `${value}0`;
    else if (value.endsWith(".")) return `${value}00`;
    else return value;
  };

  return (
    <div className={"input-currency flex w-auto flex-col"}>
      <RequiredLabel size={size} label={label} required={required} />

      <Controller
        control={control as Control}
        name={name}
        rules={{
          ...validateProps,
          required: required ? "Esse campo é obrigatório" : undefined,
          min: { value: 0, message: "Somente valores positivos" }
        }}
        render={({ field }) => (
          <div
            className={`relative mt-0 flex flex-row px-0 ${sizeStyle[size].inputGroup} min-w-fit`}
          >
            <input
              className={`min-w-fit border-b-[1px] border-black bg-transparent pt-0.5 text-black shadow-sm hover:shadow-md focus:border-b-[1.5px] focus:border-blue-0 focus:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:border-gray-2 disabled:text-gray-2 disabled:shadow-sm ${sizeStyle[size].input}`}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue="0.00"
              {...field}
              {...inputProps}
              onChange={(v) =>
                field.onChange(NumberUtils.formatMoney(v?.target?.value))
              }
              onBlur={(e) => field.onChange(addDecimalIfNeeded(e.target.value))}
            />
            <div className={sizeStyle[size].children}>
              {size === "large" ? (
                <h4 className={`tag-h4 ${currencyTextStyle}`}>R$</h4>
              ) : (
                <h6 className={`tag-h6 ${currencyTextStyle}`}>R$</h6>
              )}
            </div>
          </div>
        )}
      />

      <ErrorMessageInput name={name} errors={errors} />
    </div>
  );
};

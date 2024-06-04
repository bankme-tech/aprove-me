import { ErrorMessageInput } from "components/Text/InputTexts/ErrorMessageInput/ErrorMessageInput";
import { RequiredLabel } from "components/Text/InputTexts/RequiredLabel/RequiredLabel";
import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import { InputMaskType } from "interfaces/interfaces/Inputs/InputMaskType";
import React, { InputHTMLAttributes, useEffect } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { MaskUtils } from "utils/maskUtils";
import { TextUtils } from "utils/textUtils";

export interface IMaskedInputProps {
  autoWidth?: boolean;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  maskType?: InputMaskType;
  name: string;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
}

export const MaskedInput: React.FC<IMaskedInputProps> = ({
  autoWidth,
  control,
  disabled,
  errors,
  inputProps,
  label,
  maskType,
  name,
  placeholder,
  required,
  size: sizeDefault,
  validateProps
}) => {
  const size = sizeDefault ?? "large";

  const sizeStyle = {
    small: {
      inputGroup: `h-5 ${autoWidth ? "w-full" : "w-36"}`,
      input: `pl-2 mt-0.5 h-5 tag-h6 ${autoWidth ? "w-full" : "w-36"}`
    },
    large: {
      inputGroup: `h-7 ${autoWidth ? "w-full" : "w-56"}`,
      input: `pl-2.5 mt-1 h-7 tag-h4 ${autoWidth ? "w-full" : "w-56"}`
    }
  };
  const autoWidthStyle = autoWidth ? "w-full" : "";

  return (
    <div className={`flex flex-col ${autoWidthStyle}`}>
      <RequiredLabel size={size} label={label} required={required} />

      <Controller
        control={control as Control}
        name={name}
        rules={{
          ...validateProps,
          required: required ? "Esse campo é obrigatório" : undefined
        }}
        render={({ field }) => {
          useEffect(() => {
            switch (maskType) {
              case "cellphone":
                field.onChange(
                  field.value && MaskUtils.cellphoneMask(field.value)
                );
                break;

              case "cnpj":
                field.onChange(field.value && MaskUtils.cnpjMask(field.value));
                break;

              case "cpf":
                field.onChange(field.value && MaskUtils.cpfMask(field.value));
                break;

              case "numbers":
                field.onChange(
                  field.value && MaskUtils.onlyNumbersMask(field.value)
                );
                break;

              default:
                break;
            }
          }, [field.value]);

          return (
            <div
              className={`relative mt-0 flex flex-row px-0 ${sizeStyle[size].inputGroup}`}
            >
              <input
                className={`border-b-[1px] border-black bg-transparent pt-0.5 text-black shadow-sm hover:shadow-md focus:border-b-[1.5px] focus:border-blue-0 focus:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:border-gray-2 disabled:text-gray-2 disabled:shadow-sm ${sizeStyle[size].input}`}
                disabled={disabled}
                placeholder={placeholder}
                {...field}
                {...inputProps}
                onChange={(v) =>
                  field.onChange(
                    TextUtils.transformEmptyStringInUndefined(v?.target?.value)
                  )
                }
              />
            </div>
          );
        }}
      />

      <ErrorMessageInput name={name} errors={errors} />
    </div>
  );
};

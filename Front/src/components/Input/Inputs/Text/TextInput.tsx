import { ErrorMessageInput } from "components/Text/InputTexts/ErrorMessageInput/ErrorMessageInput";
import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode
} from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { TextUtils } from "utils/textUtils";
import { RequiredLabel } from "../../../Text/InputTexts/RequiredLabel/RequiredLabel";

export interface ITextInputProps {
  autoWidth?: boolean;
  children?: ReactNode;
  className?: string;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  name: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "large";
  stylesInputGroupOveride?: string;
  stylesInputOveride?: string;
  stylesChildren?: string;
  validateProps?: IValidateFormsProps;
  type?: HTMLInputTypeAttribute;
}

export const TextInput: React.FC<ITextInputProps> = ({
  autoWidth,
  children,
  className,
  control,
  disabled,
  errors,
  inputProps,
  label,
  name,
  onChange,
  placeholder,
  required,
  size: sizeDefault,
  stylesInputGroupOveride,
  stylesInputOveride,
  stylesChildren,
  validateProps,
  type
}) => {
  const size = sizeDefault ?? "large";

  const childrenInInputStyle = children ? "pr-14" : "pr-2";
  const autoWidthStyle = {
    group: autoWidth ? "w-full" : "",
    inputGroup: {
      small: autoWidth ? "w-full" : "w-36",
      large: autoWidth ? "w-full" : "w-56"
    }
  };
  const sizeStyle = {
    small: {
      inputGroup:
        stylesInputGroupOveride ?? `h-5 ${autoWidthStyle.inputGroup.small}`,
      input:
        stylesInputOveride ??
        `pl-2 mt-0.5 h-5 tag-h6 ${autoWidthStyle.inputGroup.small} ${childrenInInputStyle}`
    },
    large: {
      inputGroup:
        stylesInputGroupOveride ?? `h-7 ${autoWidthStyle.inputGroup.large}`,
      input:
        stylesInputOveride ??
        `pl-2.5 mt-1 h-7 tag-h4 ${autoWidthStyle.inputGroup.large} ${childrenInInputStyle}`
    }
  };

  return (
    <div className={`flex flex-col ${autoWidthStyle.group} ${className}`}>
      <RequiredLabel
        size={size === "large" ? "large" : "default"}
        label={label}
        required={required}
      />

      <div
        className={`relative mt-0 flex flex-row px-0 ${sizeStyle[size].inputGroup}`}
      >
        <Controller
          name={name}
          control={control}
          rules={{
            required: required ? "Esse campo é obrigatório" : undefined,
            ...validateProps
          }}
          render={({ field }) => (
            <input
              type={type}
              className={`border-b-[1px] border-black bg-transparent pt-0.5 text-black shadow-sm hover:shadow-md focus:border-b-[1.5px] focus:border-blue-0 focus:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:border-gray-2 disabled:text-gray-2 disabled:shadow-sm ${sizeStyle[size].input}`}
              disabled={disabled}
              {...inputProps}
              placeholder={placeholder}
              value={field.value}
              onChange={(v) => {
                const value = v?.target?.value;

                if (value) {
                  field.onChange(
                    TextUtils.transformEmptyStringInUndefined(value ?? "")
                  );

                  if (onChange) {
                    onChange(
                      TextUtils.transformEmptyStringInUndefined(value ?? "")
                    );
                  }
                } else {
                  field.onChange(value);

                  if (onChange) {
                    onChange(value);
                  }
                }
              }}
            />
          )}
        />
        <div className={stylesChildren}>{children}</div>
      </div>

      <ErrorMessageInput name={name} errors={errors} />
    </div>
  );
};

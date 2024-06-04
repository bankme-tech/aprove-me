import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "components/Button/IconButton/IconButton";
import { ProgressSuccessWarn } from "components/ProgressSuccess/ProgressSuccessWarn/ProgressSuccessWarn";
import { colors } from "global/Colors";
import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import { IWarnSuccess } from "interfaces/interfaces/Warn/IWarnSuccess";
import React, { useState } from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { TextUtils } from "utils/textUtils";
import { TextInput } from "../../Text/TextInput";

export interface IPasswordInputWithWarnProps {
  autoWidth?: boolean;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  label: string;
  name: string;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
  value: string;
  warns: IWarnSuccess[];
}

export const PasswordInputWithWarn: React.FC<IPasswordInputWithWarnProps> = ({
  autoWidth,
  control,
  disabled,
  errors,
  label,
  name,
  required,
  size: sizeDefault,
  validateProps,
  value,
  warns
}) => {
  const size = sizeDefault ?? "large";

  const sizeStyle = {
    small: { children: "absolute right-1.5 bottom-0" },
    large: { children: "absolute right-1.5 top-0.5" }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <TextInput
        label={label}
        required={required}
        disabled={disabled}
        name={name}
        validateProps={{
          ...validateProps,
          pattern: {
            value: TextUtils.mergeRegex(
              ...warns.map((warn) => warn.expression)
            ),
            message: "Valor fora dos requisitos básicos de senha"
          }
        }}
        control={control}
        size={size}
        type={showPassword ? "text" : "password"}
        stylesChildren={sizeStyle[size].children}
        autoWidth={autoWidth}
        errors={errors}
      >
        <IconButton
          disabled={disabled}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <VisibilityIcon sx={{ color: colors["blue-0"] }} fontSize="small" />
          ) : (
            <VisibilityOffIcon
              sx={{ color: disabled ? colors["gray-2"] : colors["blue-0"] }}
              fontSize="small"
            />
          )}
        </IconButton>
      </TextInput>
      {value && <ProgressSuccessWarn warns={warns} text={value} />}
    </div>
  );
};

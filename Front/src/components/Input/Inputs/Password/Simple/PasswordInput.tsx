import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "components/Button/IconButton/IconButton";
import { colors } from "global/Colors";
import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import React, { useState } from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { TextInput } from "../../Text/TextInput";

export interface IPasswordInputProps {
  autoWidth?: boolean;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  label: string;
  name: string;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
}

export const PasswordInput: React.FC<IPasswordInputProps> = ({
  autoWidth,
  control,
  disabled,
  errors,
  label,
  name,
  required,
  size: sizeDefault,
  validateProps
}) => {
  const size = sizeDefault ?? "large";

  const sizeStyle = {
    small: { children: "absolute right-1.5 bottom-0" },
    large: { children: "absolute right-1.5 top-0.5" }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      label={label}
      required={required}
      disabled={disabled}
      name={name}
      validateProps={validateProps}
      control={control}
      autoWidth={autoWidth}
      size={size}
      type={showPassword ? "text" : "password"}
      stylesChildren={sizeStyle[size].children}
      errors={errors}
    >
      <IconButton
        disabled={disabled}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <VisibilityIcon sx={{ color: colors["purple-0"] }} fontSize="small" />
        ) : (
          <VisibilityOffIcon
            sx={{ color: disabled ? colors["gray-1"] : colors["purple-0"] }}
            fontSize="small"
          />
        )}
      </IconButton>
    </TextInput>
  );
};

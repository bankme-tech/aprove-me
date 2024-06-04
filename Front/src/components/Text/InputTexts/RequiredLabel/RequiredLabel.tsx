import React from "react";

export interface IRequiredLabelProps {
  disabled?: boolean;
  label: string;
  required?: boolean;
  size?: "small" | "default" | "large";
}

export const RequiredLabel: React.FC<IRequiredLabelProps> = ({
  disabled,
  label,
  required,
  size: sizeDefault
}) => {
  const size = sizeDefault ?? "default";

  const sizeStyle = {
    small: "tag-h6",
    default: "tag-p",
    large: "tag-h4"
  };
  const disabledStyle = disabled ? "cursor-not-allowed" : "";

  return (
    <div className={`inline ${disabledStyle}`}>
      <p className={`${sizeStyle[size]}`}>
        {label}
        <span className={`ml-1 w-2 text-alert ${sizeStyle[size]}`}>
          {required && "*"}
        </span>
      </p>
    </div>
  );
};

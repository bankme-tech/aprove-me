import React, { ReactNode } from "react";

export interface IIconButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  lightHover?: boolean;
  onClick: () => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  children,
  className,
  disabled,
  lightHover,
  onClick
}) => {
  const lightHoverStyle = lightHover
    ? "hover:bg-white/30"
    : "hover:bg-purple-2";

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-full duration-200 disabled:cursor-not-allowed disabled:bg-transparent ${lightHoverStyle} ${className}`}
    >
      {children}
    </button>
  );
};

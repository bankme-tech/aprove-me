import React from "react";
import { ApproveButton } from "./components/ApproveButton/ApproveButton";
import { PrimaryButton } from "./components/PrimaryButton/PrimaryButton";
import { ReproveButton } from "./components/ReproveButton/ReproveButton";
import { SecondaryButton } from "./components/SecondaryButton/SecondaryButton";

export interface ITextButtonProps {
  actionType?: "button" | "submit" | "reset";
  autoWidth?: boolean;
  children: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  onClick: () => void;
  size?: "small" | "default" | "large";
  type?: "primary" | "secondary" | "approve" | "reprove";
}

export const TextButton: React.FC<ITextButtonProps> = (props) => {
  const buttonType = props?.type ?? "primary";
  const buttonSize = props?.size ?? "default";

  return (
    <>
      {buttonType === "primary" && (
        <PrimaryButton {...props} textSize={buttonSize}>
          {props.children}
        </PrimaryButton>
      )}

      {buttonType === "secondary" && (
        <SecondaryButton {...props} textSize={buttonSize}>
          {props.children}
        </SecondaryButton>
      )}

      {buttonType === "approve" && (
        <ApproveButton {...props} textSize={buttonSize}>
          {props.children}
        </ApproveButton>
      )}

      {buttonType === "reprove" && (
        <ReproveButton {...props} textSize={buttonSize}>
          {props.children}
        </ReproveButton>
      )}
    </>
  );
};

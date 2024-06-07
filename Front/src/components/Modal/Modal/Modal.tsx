import React, { ReactNode } from "react";
import { ButtonType } from "../interfaces/ButtonType";
import { BaseModal } from "./components/BaseModal/BaseModal";

export interface IModalProps {
  buttons: ButtonType[];
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  size?: "default" | "small" | "large" | "extra-large";
  submitAction?: () => void;
  title?: string;
}

export const Modal: React.FC<IModalProps> = ({
  buttons,
  children,
  open,
  setOpen,
  size: sizeDefault,
  submitAction,
  title
}) => {
  const size = sizeDefault ?? "default";

  const width = {
    "extra-large": "lg",
    large: "md",
    default: "sm",
    small: "xs"
  };

  return (
    <BaseModal
      width={width[size] as "lg" | "md" | "sm" | "xs" | "xl"}
      open={open}
      setOpen={setOpen}
      buttons={buttons}
      title={title}
      submitAction={submitAction}
    >
      {children}
    </BaseModal>
  );
};

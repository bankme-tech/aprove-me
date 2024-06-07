import { Dialog } from "@mui/material";
import { Close } from "components/Button/Close/Close";
import { ButtonType } from "components/Modal/interfaces/ButtonType";
import React, { ReactNode } from "react";
import { ActionButtons } from "../ActionButtons/ActionButtons";

interface IBaseModalProps {
  buttons?: ButtonType[];
  children?: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  submitAction?: () => void;
  title?: string;
  width: "sm" | "xs" | "md" | "lg" | "xl";
}

export const BaseModal: React.FC<IBaseModalProps> = ({
  buttons,
  children,
  open,
  setOpen,
  submitAction,
  title,
  width
}) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      fullWidth
      maxWidth={width}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "rgba(0,0,0,0)",
          borderRadius: "1.2rem",
          paddingRight: "4px",
          minHeight: "fit-content"
        }
      }}
    >
      <form
        onSubmit={submitAction}
        className="scrollbar-pattern h-full overflow-y-auto"
      >
        <div className="relative min-h-[3.5rem] w-full rounded-2xl border-[1.5px] border-purple-0 bg-white">
          <Close
            color="purple-0"
            className="absolute right-3 top-3"
            onChange={handleClose}
          />
          <div className="flex h-full w-full flex-col items-center gap-2 py-4">
            {title && width === "xs" ? (
              <h3 className="tag-h3">{title}</h3>
            ) : (
              <h1 className="tag-h1">{title}</h1>
            )}
            {children}
            {buttons && (
              <ActionButtons
                isSmall={width === "sm" || width === "xs"}
                buttons={buttons}
              />
            )}
          </div>
        </div>
      </form>
    </Dialog>
  );
};

import { ChangeEvent } from "react";
import { PayableData } from "./PayableData";

export interface PayableCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPayable: PayableData) => void;
  handlePayableDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
import { AssignorData } from "./AssignorData";

export interface AssignorCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAssignor: AssignorData) => void;
}

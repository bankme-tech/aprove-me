export type ButtonType = {
  actionType?: "button" | "submit" | "reset";
  action?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  text: string;
  type: "primary" | "secondary" | "close" | "approve" | "reprove";
};

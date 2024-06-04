import { ActionType } from "interfaces/interfaces/Inputs/ActionType";

export interface IButtonProps {
  actionType?: ActionType;
  autoWidth?: boolean;
  children: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  onClick: () => void;
  textSize: "small" | "default" | "large";
}

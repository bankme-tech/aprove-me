import { IActionType } from "interfaces/interfaces/Forms/IActionType";

export interface IButtonProps {
  actionType?: IActionType;
  autoWidth?: boolean;
  children: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  onClick: () => void;
  textSize: "small" | "default" | "large";
}

import { TextButton } from "components/Button/TextButton/TextButton";
import { ButtonType } from "components/Modal/interfaces/ButtonType";
import React from "react";
import { TextUtils } from "utils/textUtils";

export interface IActionButtonsProps {
  buttons: ButtonType[];
  isSmall?: boolean;
}

interface IButtonTypeStyle {
  [key: string]: {
    isOutlined?: boolean;
    type: "primary" | "secondary" | "approve" | "reprove";
  };
}

export const ActionButtons: React.FC<IActionButtonsProps> = ({
  buttons,
  isSmall
}) => {
  const buttonTypeStyle: IButtonTypeStyle = {
    primary: { type: "primary" },
    secondary: { type: "primary", isOutlined: true },
    close: { type: "secondary" },
    approve: { type: "approve" },
    reprove: { type: "reprove" }
  };

  return (
    <div className="flex w-full items-end justify-center gap-6">
      {buttons.map((button) => (
        <TextButton
          actionType={button?.actionType}
          isDisabled={button?.isDisabled}
          isLoading={button?.isLoading}
          isOutlined={buttonTypeStyle[button.type].isOutlined}
          key={TextUtils.generateRandomKey()}
          onClick={button?.action ?? (() => undefined)}
          size={isSmall ? "default" : "large"}
          type={buttonTypeStyle[button.type].type}
        >
          {button.text}
        </TextButton>
      ))}
    </div>
  );
};

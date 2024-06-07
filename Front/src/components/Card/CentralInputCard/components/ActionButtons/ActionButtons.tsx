import { Redirect } from "components/Button/Redirect/Redirect";
import { TextButton } from "components/Button/TextButton/TextButton";
import React from "react";

interface IActionButtonsProps {
  isLoading?: boolean;
  redirectLink?: string;
  redirectText?: string;
  textActionFormButton: string;
}

export const ActionButtons: React.FC<IActionButtonsProps> = ({
  isLoading,
  redirectLink,
  redirectText,
  textActionFormButton
}) => (
  <div className="flex flex-col items-center gap-2">
    <TextButton
      onClick={() => undefined}
      isLoading={isLoading}
      actionType="submit"
    >
      {textActionFormButton}
    </TextButton>
    {redirectText && redirectLink && (
      <Redirect destination={redirectLink}>{redirectText}</Redirect>
    )}
  </div>
);

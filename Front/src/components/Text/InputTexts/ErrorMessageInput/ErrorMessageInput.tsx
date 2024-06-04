import React from "react";
import { ErrorMessage as ErrorMessageHookForm } from "@hookform/error-message";
import { FieldErrors, FieldValues } from "react-hook-form";
import { ErrorMessage } from "components/Text/InputTexts/ErrorMessage/ErrorMessage";

export interface IErrorMessageInputProps {
  errors?: FieldErrors<FieldValues>;
  name: string;
}

export const ErrorMessageInput: React.FC<IErrorMessageInputProps> = ({
  errors,
  name
}) => (
  <>
    {errors && (
      <ErrorMessageHookForm
        errors={errors}
        name={name}
        render={({ message }) => message && <ErrorMessage message={message} />}
      />
    )}
  </>
);

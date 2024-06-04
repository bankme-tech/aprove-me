import { InputGroup } from "components/Input/InputGroup/InputGroup";
import { IPageFormsInput } from "interfaces/interfaces/Inputs/IPageFormsInput";
import React from "react";
import { useForm } from "react-hook-form";
import { ActionButtons } from "./components/ActionButtons/ActionButtons";
import { CardHeader } from "./components/CardHeader/CardHeader";

export interface ICentralInputCardProps {
  inputs: IPageFormsInput[];
  onSubmit: (data: any) => void;
  redirectLink?: string;
  redirectText?: string;
  textActionFormButton: string;
  texts?: string[];
  title: string;
}

export const CentralInputCard: React.FC<ICentralInputCardProps> = ({
  inputs,
  onSubmit,
  redirectLink,
  redirectText,
  textActionFormButton,
  texts,
  title
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch
  } = useForm();

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-6 rounded-2xl border border-blue-2 bg-gray-5 p-8 shadow-md shadow-white/20">
      <CardHeader title={title} texts={texts} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        {inputs && (
          <InputGroup
            control={control}
            errors={errors}
            inputColumn={inputs}
            watch={watch}
          />
        )}

        <ActionButtons
          isLoading={isSubmitting}
          redirectLink={redirectLink}
          redirectText={redirectText}
          textActionFormButton={textActionFormButton}
        />
      </form>
    </div>
  );
};

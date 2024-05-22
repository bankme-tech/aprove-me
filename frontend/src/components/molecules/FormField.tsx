import { Field } from "../atoms/Field";

type FormField = {
  title: string;
};

export const FormField = ({ title }: FormField) => {
  return (
    <>
      <p className="mb-2 text-lg font-semibold">{title}</p>
      <Field />
    </>
  );
};

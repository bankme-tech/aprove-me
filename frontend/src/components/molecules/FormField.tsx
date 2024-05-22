import { Field } from "../atoms/Field";

type FormField = {
  name: string;
};

export const FormField = ({ name }: FormField) => {
  return (
    <>
      <p className="mb-2 text-lg font-semibold">{name}</p>
      <Field />
    </>
  );
};

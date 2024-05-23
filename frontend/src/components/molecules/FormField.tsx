import { Field } from "../atoms/Field";

type FormField = {
  title: string;
};

export const FormField = ({ title, form, name, ...props }: any) => {
  return (
    <div>
      <label className="text-lg font-semibold">{title}</label>
      <Field form={form} {...props} />
    </div>
  );
};

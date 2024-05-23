import { Field, FieldDate, FieldSelect } from "../atoms/Field";

type FormField = {
  title: string;
};

export const FormField = ({ title, form, type, ...props }: any) => {
  return (
    <div>
      <label className="text-lg font-semibold">{title}</label>
      <Field form={form} {...props} />
    </div>
  );
};

export const FormFieldDate = ({ title, form, ...props }: any) => {
  return (
    <div>
      <label className="text-lg font-semibold">{title}</label>
      <FieldDate form={form} {...props} />
    </div>
  );
};

export const FormFieldSelect = ({ title, form, options, ...props }: any) => {
  return (
    <div>
      <label className="text-lg font-semibold">{title}</label>
      <FieldSelect form={form} options={options} {...props} />
    </div>
  );
};

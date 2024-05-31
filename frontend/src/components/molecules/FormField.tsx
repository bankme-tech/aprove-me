import { Field, FieldDate, FieldSelect } from "../atoms/Field";

type FormField = {
  title: string;
};

export const FormField = ({ title, form, error, ...props }: any) => {
  return (
    <div className="w-full">
      <label className="text-lg font-semibold" htmlFor={form.name}>
        {title}
      </label>
      <Field form={form} aria-describedby={`${form.name}-error`} {...props} />
      {error[form.name] && (
        <span role="alert" className=" text-red-500">
          {error[form.name].message}
        </span>
      )}
    </div>
  );
};

export const FormFieldDate = ({ title, form, error, ...props }: any) => {
  return (
    <div className="w-full">
      <label className="text-lg font-semibold" htmlFor={form.name}>
        {title}
      </label>
      <FieldDate
        form={form}
        aria-describedby={`${form.name}-error`}
        {...props}
      />
      {error[form.name] && (
        <span role="alert" className=" text-red-500">
          {error[form.name].message}
        </span>
      )}
    </div>
  );
};

export const FormFieldSelect = ({
  title,
  form,
  options,
  error,
  ...props
}: any) => {
  return (
    <div className="w-full">
      <label className="text-lg font-semibold" htmlFor={form.name}>
        {title}
      </label>
      <FieldSelect
        form={form}
        options={options}
        aria-describedby={`${form.name}-error`}
        {...props}
      />
      {error[form.name] && (
        <span role="alert" className=" text-red-500">
          {error[form.name].message}
        </span>
      )}
    </div>
  );
};

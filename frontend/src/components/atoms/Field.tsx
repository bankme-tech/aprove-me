// TODO: could be improved in a one component

export const Field = ({ form, ...props }: any) => {
  return (
    <input
      type="text"
      className="w-full mt-4 py-2 px-4 h-16 rounded-xl border border-gray-300 focus:outline-none focus:border-success focus:shadow-xl"
      {...props}
      {...form.register(form.name)}
    />
  );
};

export const FieldDate = ({ form, ...props }: any) => {
  return (
    <input
      type="date"
      className="w-full mt-4 py-2 px-4 h-16 rounded-xl border border-gray-300 focus:outline-none focus:border-success focus:shadow-xl"
      {...props}
      {...form.register(form.name)}
    />
  );
};

export const FieldSelect = ({ form, options, ...props }: any) => {
  return (
    <select
      className="w-full mt-4 py-2 px-4 h-16 rounded-xl border border-gray-300 focus:outline-none focus:border-success focus:shadow-xl"
      {...props}
      {...form.register(form.name)}
    >
      <option value="">Selecione...</option>
      {options.map((option: any) => (
        <option key={option.key} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

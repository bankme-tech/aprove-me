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

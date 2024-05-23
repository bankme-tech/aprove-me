import { FormField } from "../molecules/FormField";

export const FormPayable = () => {
  return (
    <>
      <div className="p-4">
        <FormField title="Cedente" />
      </div>
      <div className="flex  bg-gray-200 gap-x-12 p-4">
        <FormField title="Valor" />
        <FormField title="Data" />
      </div>
    </>
  );
};

import { FormField } from "../molecules/FormField";

export const FormAssignor = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full h-full p-4">
      <FormField title="Nome" />
      <FormField title="CPF/CNPJ" />
      <FormField title="Email" />
      <FormField title="Telefone" />
    </div>
  );
};

import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

type FormField = {
  name: string;
};

export const FormLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <FormField name="Login" />
      <FormField name="Senha" />
      <Button />
    </div>
  );
};

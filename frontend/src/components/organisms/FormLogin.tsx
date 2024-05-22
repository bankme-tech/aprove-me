import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

type FormField = {
  name: string;
};

// TODO: To media lees than tablet the component has different

export const FormLogin = () => {
  return (
    <div className="flex flex-col gap-8 w-1/2 h-full">
      <p className="text-6xl text-end mb-32">
        <span className="font-bold text-primary">Bankme</span> o seu banco
        preferido!
      </p>

      <FormField title="Login" />
      <FormField title="Senha" />

      <div className="flex items-center justify-between">
        <p className="text-2xl text-primary-dark underline">
          Esqueceu sua senha ?
        </p>
        <div className="w-1/3">
          <Button label="Logar" />
        </div>
      </div>
    </div>
  );
};

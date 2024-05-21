import { UseFormRegister } from "react-hook-form";
import { AssignorSchema } from "../types";
import Input from "./ui/input";
import ErrorMessage from "./ui/errorMessage";

interface Props {
  register: UseFormRegister<AssignorSchema>;
  error: any
}

export default function AssignorFormInputs(props: Props) {
  return (
    <div className={"flex-col gap-3 flex"} >
      <ErrorMessage error={props.error} />
      <Input
        label="CPF ou CNPJ do Cedente:"
        placeholder="CPF ou CNPJ"
        register={props.register('document')}
      />
      <Input
        label="Email do Cedente:"
        placeholder="Email"
        register={props.register('email')}
      />
      <Input
        label="Telefone do cedente:"
        placeholder="Telefone"
        register={props.register('phone')}
      />
      <Input
        label="Nome do cedente:"
        placeholder="Nome"
        register={props.register('name')}
      />
    </div>
  )
}
import { UseFormRegister } from "react-hook-form";
import Combobox from "./ui/combobox";
import Input from "./ui/input";
import { AssignorType, PayableSchema } from "../types";
import ErrorMessage from "./ui/errorMessage";

interface Props {
  register: UseFormRegister<PayableSchema>;
  newAssignor: boolean;
  setNewAssignor: (value: boolean) => void;
  assignors: AssignorType[],
  error: any
}

export default function PayableFormInputs(props: Props) {
  return (
    <div className="flex flex-col gap-3 items-end">
      <ErrorMessage error={props.error} />
      <Input
        label="Valor"
        placeholder="Valor"
        register={props.register('value')}
      />
      <Input
        type="date"
        label="Data de emissão"
        register={props.register('emissionDate')}
      />
      <Combobox
        label="Cedente"
        register={props.register('assignor')}
        options={props.assignors}
        disabled={props.newAssignor}
      />
      <button
        className="text-themeColor text-sm hover:text-opacity-90 ease-in-out duration-20"
        onClick={(event) => {
          event.preventDefault();
          props.setNewAssignor(!props.newAssignor);
        }}
      >
        {props.newAssignor ? 'X' : 'Novo cedente?'}
      </button>
    </div>
  )

}
import { useForm } from "react-hook-form";
import { DialogFooter } from "../molecules/DialogFooter";
import {
  FormField,
  FormFieldDate,
  FormFieldSelect,
} from "../molecules/FormField";

export const FormPayable = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: any = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 w-full">
        <FormFieldSelect
          title="Cedente"
          form={{ name: "assignorId", register }}
          options={[
            {
              id: "547f32a7-064f-48b4-9192-02d980da8035",
              label: "12345678900",
              email: "fake@example.com",
              phone: "1234567890",
              name: "Fake Assignor",
            },
          ]}
        />
      </div>
      <div className="flex bg-gray-200 gap-x-12 p-4 w-full">
        <FormField title="Valor" form={{ name: "value", register }} />
        <FormFieldDate title="Data" form={{ name: "date", register }} />
      </div>
      <DialogFooter type="submit" />
    </form>
  );
};

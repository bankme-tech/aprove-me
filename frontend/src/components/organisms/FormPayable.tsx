import { useForm } from "react-hook-form";
import { FormField } from "../molecules/FormField";

export const FormPayable = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: any = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4">
        <FormField title="Cedente" register={register} name="assignorId" />
      </div>
      <div className="flex bg-gray-200 gap-x-12 p-4 ">
        <FormField title="Valor" register={register} name="value" />
        <FormField title="Data" register={register} name="date" />
      </div>
    </form>
  );
};

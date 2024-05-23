import { findManyAssignor } from "@/services";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogFooter } from "../molecules/DialogFooter";
import {
  FormField,
  FormFieldDate,
  FormFieldSelect,
} from "../molecules/FormField";

export const FormPayable = () => {
  const [options, setOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: any = (data: any) => console.log(data);

  useEffect(() => {
    const fetch = async () => {
      const assignors = await findManyAssignor({ limit: 10, page: 1 });
      console.log("🚀 ~ fetch ~ assignors:", assignors);

      setOptions(assignors);
    };

    fetch();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 w-full">
        <FormFieldSelect
          title="Cedente"
          form={{ name: "assignorId", register }}
          options={options.map((option: any) => ({
            key: option.id,
            value: option.id,
            label: option.name,
          }))}
        />
      </div>
      <div className="flex flex-col md:flex-row md:flex-nowrap md:gap-0 flex-wrap gap-4 bg-gray-200 p-4 w-full justify-between">
        <FormField title="Valor" form={{ name: "value", register }} />
        <FormFieldDate title="Data" form={{ name: "date", register }} />
      </div>
      <DialogFooter type="submit" />
    </form>
  );
};

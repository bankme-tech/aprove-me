import { createPayable, findManyAssignor } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { DialogFooter } from "../molecules/DialogFooter";
import {
  FormField,
  FormFieldDate,
  FormFieldSelect,
} from "../molecules/FormField";

type Inputs = {
  assignorId: string;
  value: string;
  emissionDate: string;
};

// TODO: fix validations value and emissionDate
const schema = z.object({
  assignorId: z.string().min(2, { message: "O campo Cedente é obrigatório" }),
  value: z.string().min(2, { message: "O campo Valor é obrigatório" }),
  emissionDate: z.string().min(2, { message: "O campo Data é obrigatório" }),
});

export const FormPayable = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const goBack = () => router.back();

  const onSubmit = async (data: any) => {
    const res = await createPayable({
      ...data,
      value: parseFloat(data.value),
      emissionDate: new Date(data.emissionDate),
    });

    if (res instanceof Error) {
      // TODO: show error message

      return;
    }

    goBack();
  };

  useEffect(() => {
    const fetch = async () => {
      const assignors = await findManyAssignor({ limit: 10, page: 1 });

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
          error={errors}
        />
      </div>
      <div className="flex flex-col flex-wrap gap-y-4 bg-gray-200 p-4 w-full md:flex-row md:flex-nowrap md:gap-x-14 md:gap-y-0">
        <FormField
          title="Valor"
          form={{ name: "value", register }}
          error={errors}
        />
        <FormFieldDate
          title="Data"
          form={{ name: "emissionDate", register }}
          error={errors}
        />
      </div>
      <DialogFooter type="submit" goBack={goBack} />
    </form>
  );
};

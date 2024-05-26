"use server";

import { createPayable } from "@/services";

export const onSubmitPayable = async (data: any) => {
  await createPayable({
    ...data,
    value: parseFloat(data.value),
    emissionDate: new Date(data.emissionDate),
  });

  return "OK";
};

import { axiosInstance } from "./api";
import { Payable } from "@/components/payable-card";

type Value = {
  value: number;
};

export default async function updatePayable(id: string, value: Value) {
  const { data, status } = await axiosInstance.patch<Payable>(`/payable/${id}`, value);

  return { data, status };
}

import { axiosInstance } from "./api";
import { Payable } from "@/components/payable-card";

type Value = {
  name: string;
  phone: string;
  email: string;
  document: string;
};

export default async function updateAssignor(id: string, value: Value) {
  const { data, status } = await axiosInstance.patch<Payable>(`/assignor/${id}`, value);

  return { data, status };
}

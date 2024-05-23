import { axiosInstance } from "./api";
import { Payable } from "@/components/payable-card";

export default async function getPayable(id: string) {
  const { data } = await axiosInstance.get<Payable>(`/payable/${id}`);

  return data;
}

import { axiosInstance } from "./api";
import { Payable } from "@/components/payable-card";

export default async function deletePayable(id: string) {
  const { status } = await axiosInstance.delete<Payable>(`/payable/${id}`);

  return status;
}

import { Payable } from "@/components/payable-card";
import { axiosInstance } from "./api";

export default async function getPayables() {
  const { data } = await axiosInstance.get<Payable[]>("/payable");

  return data;
}

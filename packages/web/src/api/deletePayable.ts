import { axiosInstance } from "./api";

export default async function deletePayable(id: string) {
  const { status } = await axiosInstance.delete(`/payable/${id}`);

  return status;
}

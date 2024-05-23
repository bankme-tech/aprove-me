import { axiosInstance } from "./api";

export default async function deleteAssignor(id: string) {
  const { status } = await axiosInstance.delete(`/assignor/${id}`);

  return status;
}

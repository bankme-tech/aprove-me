import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import api from "../services/api";
import { fetchHeaders } from "@/utils";

export function useDeletePayable() {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }: any): Promise<any> => {
      console.log("Id recebido no mutationFn():", id);
      const response = await api.delete(`/integrations/payable/${id}`, {
        headers: fetchHeaders(),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Pagável deletado com sucesso!");
      window.location.reload();
    },
    onError(error) {
      console.log("Caiu no onError do useCreatePayable");
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return {
    deletePayable: mutateAsync,
  };
}

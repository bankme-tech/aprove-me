import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import api from "../services/api";

export function useUpdatePayable() {
  
  const { mutateAsync } = useMutation({
    mutationFn: async ({ body, id }: any): Promise<any> => {
      console.log("Body recebido no mutationFn():", body);
      const response = await api.patch(`/integrations/payable/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Atualização realizada com sucesso!");
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
    updatePayable: mutateAsync,
  };
}

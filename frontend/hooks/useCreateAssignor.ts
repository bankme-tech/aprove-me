import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { isAxiosError } from "axios";
import api from "../services/api";

export function useCreateAssignor() {
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: async (body : any) => {
      console.log("Body recebido no mutationFn():", body);
      const response = await api.post("/integrations/assignor", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cadastro de Cedente realizado com sucesso!");
      router.push('/');
    },
    onError(error) {
      console.log("Caiu no onError do useCreateAssignor");
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return {
    createAssignor: mutateAsync,
  };
}

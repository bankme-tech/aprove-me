import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { isAxiosError } from "axios";
import api from "../services/api";

export function useCreatePayable() {
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: async (body : any) => {
      console.log("Body recebido no mutationFn():", body);
      const response = await api.post("/integrations/payable", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      router.push('/');
    },
    onError(error) {
      console.log("Caiu no onError do useCreateProfessional");
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return {
    createPayable: mutateAsync,
  };
}

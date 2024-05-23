import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { isAxiosError } from "axios";
import api from "../services/api";
import Cookie from "js-cookie";

export function useLogin() {
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: async (body : any) => {
      const response = await api.post("/login", body);
      console.log(response?.data?.token);
      Cookie.set("user_token", response.data?.token);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      router.push('/list-payable');
    },
    onError(error) {
      console.log("Caiu no onError do useLogin");
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return {
    login: mutateAsync,
  };
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

import { authService } from "../../../app/services/auth";
import { AuthParams } from "../../../app/services/auth/interfaces";
import { useAuth } from "../../../app/hooks";

const schema = z.object({
  login: z.string().min(1, "Login é obrigatório"),
  password: z.string().min(1, "Password é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useLogin() {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: AuthParams) => {
      return authService.signin(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isLoading };
}

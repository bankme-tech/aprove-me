import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/formError/formError";
import { useAuthStore } from "@/stores/authStore";
import { LoginTypes, loginSchema } from "@/types/login";
import { Loader2Icon } from "lucide-react";

export const LoginForm = () => {
  const loginId = useId();
  const passwordId = useId();

  const login = useAuthStore((state) => state.login);

  const { formState, handleSubmit, register } = useForm<LoginTypes>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginTypes> = async (data) => {
    await login(data);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={loginId}>Login</label>
        <Input id={loginId} {...register("login")} />
        <FormError message={formState.errors.login?.message} />
      </div>

      <div>
        <label htmlFor={passwordId}>Senha</label>
        <Input type="password" id={passwordId} {...register("password")} />
        <FormError message={formState.errors.password?.message} />
      </div>

      <Button disabled={!formState.isValid} size="full">
        {formState.isSubmitting && <Loader2Icon className="animate-spin" />}{" "}
        Fazer login
      </Button>
    </form>
  );
};

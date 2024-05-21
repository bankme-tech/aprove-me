import { FormError } from "@/components/formError/formError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupTypes, signupSchema } from "./signupSchema";
import { useAuthStore } from "@/stores/authStore";

export const SignupForm = () => {
  const loginId = useId();
  const passwordId = useId();

  const signup = useAuthStore((state) => state.signup);

  const { formState, handleSubmit, register } = useForm<SignupTypes>({
    defaultValues: {
      login: "",
      password: "",
      samePassword: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupTypes> = async (data) => {
    await signup({ login: data.login, password: data.password });
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

      <div>
        <label htmlFor={passwordId}>Repita sua senha</label>
        <Input type="password" id={passwordId} {...register("samePassword")} />
        <FormError message={formState.errors.samePassword?.message} />
      </div>

      <Button size="full">Fazer cadastro</Button>
    </form>
  );
};

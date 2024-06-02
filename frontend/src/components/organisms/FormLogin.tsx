"use client";

import { authenticate } from "@/services";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

// TODO: To media less than tablet the component has different
export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const authenticated = await authenticate(data);
    if (authenticated instanceof Error) {
      return;
    }

    localStorage.setItem("token", authenticated.access_token);

    router.push("/payable");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 w-1/2 h-full"
    >
      <p className="text-6xl text-end mb-32">
        <span className="font-bold text-primary">Bankme</span> o seu banco
        preferido!
      </p>

      <FormField
        title="Login"
        placeholder="Digite seu login..."
        form={{ name: "login", register }}
        error={errors}
      />
      <FormField
        title="Senha"
        type="password"
        placeholder="Digite sua senha..."
        form={{ name: "password", register }}
        error={errors}
      />

      <div className="flex items-center justify-between">
        <a href="#" className="text-2xl text-primary-dark underline">
          Esqueceu sua senha?
        </a>
        <div className="w-1/3">
          <Button type="submit">Logar</Button>
        </div>
      </div>
    </form>
  );
};

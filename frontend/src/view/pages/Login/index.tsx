import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { useLogin } from "./useLogin";

export function Login() {
  const { handleSubmit, register, errors, isLoading } = useLogin();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Aprove-me
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-2">
        <Input
          type="login"
          placeholder="Login"
          error={errors.login?.message}
          {...register("login")}
        />

        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}

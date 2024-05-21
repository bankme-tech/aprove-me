import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useId } from "react";

export const LoginForm = () => {
  const loginId = useId();
  const passwordId = useId();

  return (
    <form>
      <label htmlFor={loginId} className="mb-2">
        Login
      </label>
      <Input id={loginId} className="mb-2" />

      <label htmlFor={passwordId}>Senha</label>
      <Input id={passwordId} />

      <Button size="full" className="mt-2">
        Fazer login
      </Button>
    </form>
  );
};

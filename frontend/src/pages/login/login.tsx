import { Button } from "@/components/ui/button";
import { LoginForm } from "./components/loginForm";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <main className="h-screen grid place-items-center">
      <div>
        <h1 className="mb-4 text-primary text-5xl font-bold">
          Aprove-me | Login
        </h1>

        <LoginForm />

        <Button asChild className="text-center w-full" variant="link">
          <Link to="/signup">Não tem uma conta? Cadastre-se</Link>
        </Button>
      </div>
    </main>
  );
};

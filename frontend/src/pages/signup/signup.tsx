import { Link } from "react-router-dom";
import { SignupForm } from "./components/signupForm";
import { Button } from "@/components/ui/button";

export const Signup = () => {
  return (
    <main className="h-screen grid place-items-center">
      <div>
        <h1 className="mb-4 text-primary text-[40px] font-bold">
          Aprove-me | Cadastro
        </h1>

        <SignupForm />

        <Button asChild className="text-center w-full" variant="link">
          <Link to="/">Já tem uma conta? Faça login</Link>
        </Button>
      </div>
    </main>
  );
};

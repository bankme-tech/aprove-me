import { LoginForm } from "./components/loginForm";

export const Login = () => {
  return (
    <main className="h-screen grid place-items-center">
      <div>
        <h1 className="mb-4 text-primary text-5xl font-bold">
          Aprove-me | Login
        </h1>

        <LoginForm />
      </div>
    </main>
  );
};

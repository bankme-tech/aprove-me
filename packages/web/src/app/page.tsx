"use client";

import { LoginForm } from "@/components/login-form";

function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-3xl">Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;

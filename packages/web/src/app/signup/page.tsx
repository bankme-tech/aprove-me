"use client";

import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-3xl">Cadastre-se</h1>
      <SignupForm />
    </div>
  );
}

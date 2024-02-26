'use client';
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginUserSchema = z.object({
  login: z.string().min(1, "Login field is required"),
  password: z.string().min(1, "Password field is required"),
});

type LoginUserData = z.infer<typeof loginUserSchema>;

function LoginPage() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { updateSessionToken } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserSchema)
  });
  const router = useRouter();

  async function loginUser(data: LoginUserData) {
    try {
      const { data: res } = await axiosInstance.post<{ token: string }>('/auth', data);
      updateSessionToken(res.token);
      router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setLoginError("Invalid login or password");
        } else {
          setLoginError("Something went wrong");
        }
      }
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-3xl">Login</h1>
      <form
        className="flex flex-col gap-4 border-2 border-blue-500 px-5 py-8 rounded-xl"
        onSubmit={handleSubmit(loginUser)}
      >
        <div className="flex flex-col">
          <label htmlFor="login" className="font-bold text-xl">Username</label>
          <input
            type="text" id="login"
            className="text-black border-2 border-blue-500 p-2 rounded-md"
            {...register("login")}
          />
          {errors.login && <p className="text-red-500">{errors.login.message?.toString()}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold text-xl">Password</label>
          <input
            type="password" id="password"
            className="text-black border-2 border-blue-500 p-2 rounded-md"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500">{errors.password.message?.toString()}</p>}
        </div>
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
        >
          Login
        </button>
        <Link
          href={"/login/create"}
          className="bg-gray-400 text-black p-2 rounded-md text-center"
        >
          Create account
        </Link>
      </form>
    </div>
  )
}

export default LoginPage;

'use client';
import axiosInstance from "@/api/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUserSchema = z.object({
  login: z.string().min(1, "Login field is required"),
  password: z.string().min(1, "Password field is required"),
});

type CreateUserData = z.infer<typeof createUserSchema>;

function CreateUserPage() {
  const [requestError, setRequestError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema)
  });
  const router = useRouter();

  async function createUser(data: any) {
    try {
      await axiosInstance.post('/user', data);
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        setRequestError("Something went wrong");
      }
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="font-bold text-3xl">Register</h1>
      <form
        className="flex flex-col gap-4 border-2 border-blue-500 px-5 py-8 rounded-xl"
        onSubmit={handleSubmit(createUser)}
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
        {requestError && <p className="text-red-500">{requestError}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default CreateUserPage;

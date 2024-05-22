import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";
import { useEffect } from "react";
import {
  AuthFormData,
  AuthResponse,
  authSchema,
  login as loginResolver,
} from "../lib/resolvers/authResolvers";
import { useAuth } from "../lib/context/AuthProvider";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/payable");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const {
    mutate,
    isPending,
  }: UseMutationResult<AuthResponse, Error, AuthFormData> = useMutation({
    mutationFn: loginResolver,
    onSuccess: (data) => {
      login(data.token);
      navigate("/payable");
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  const onSubmit = (data: AuthFormData) => {
    mutate(data);
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700" htmlFor="login">
              login
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="login"
              placeholder="Enter your login"
              {...register("login")}
            />
            {errors.login && (
              <p className="text-red-500">{errors.login.message}</p>
            )}
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              id="password"
              placeholder="Enter your password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            className="w-full px-4 py-2 font-medium text-white bg-gray-500 hover:bg-gray-700 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link className="text-primary-500 hover:underline" to="/register">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthFormData, authFormSchema } from "@/schemas/auth-schemas";
import { api } from "@/api/api";

import { AxiosError } from "axios";
import { Loading } from "@/components/Loading";
import Link from "next/link";



export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function register({ login, password }: AuthFormData) {
    try {
      setIsLoading(true);
      await api.post("/user", {login, password});
      router.push("/auth");
    }
    catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        setRegisterError("User already exists");
      } else {
        console.log(error)
        setRegisterError("Something went wrong");
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (formData: AuthFormData) => {
    const { login, password } = formData;
     await register({ login, password });
  };
  return (
    <div className="flex min-h-screen max-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center border rounded-xl px-2">
        <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]  p-10 m-auto">
          <div className="flex flex-col space-y-2 text-center items-center">
            <div className="mb-2">
              <Image src="/logo-bankme.png" width={50} height={50} alt="logo" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">
            Register 
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-md w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Login</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="aprovame"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {registerError && <p className="text-red-500">{registerError}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loading /> : "Entrar"}
              </Button>
            </form>
          </Form>
          <div className="flex flex-col space-y-2 text-center items-center mb-10">
            <p className="px-8 text-center text-sm text-muted-foreground">
              ​ Already have an account? {" "}
              <Link
                className="underline underline-offset-4 hover:text-primary text-blue-500"
                href={"/auth"}
              >
                Login
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
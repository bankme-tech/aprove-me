"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "../../../public/logo-bankme.png";
import useCheckToken from "../hooks/useCheckToken";
import useCreateAssignor from "../hooks/useCreateAssignor";
import useGetPayable from "../hooks/useGetPayable";
import style from "./page.module.css";

const formSchema = z
  .object({
    document: z.string({ required_error: "document is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
    confirm_password: z.string().min(6).optional(),
    phone: z.string({ required_error: "phone is required" }),
    name: z.string({ required_error: "name is required" }).min(5),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
  });

export default function RegisterAssignor() {
  const { data: payables, isLoading } = useGetPayable();
  const [token, setToken] = useState<string>();
  const { push } = useRouter();

  const {
    mutate: mutateCreateAssignor,
    error: assignorError,
    isSuccess: isCreatedSuccess,
    data: assignorData,
  } = useCreateAssignor();

 useCheckToken();


  useEffect(() => {
    if (isCreatedSuccess) {
      push("/");
    }
  }, [isCreatedSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      name: "",
    },
  });

  const handleAssignorCreate = (values: z.infer<typeof formSchema>) => {
    delete values.confirm_password;
    return mutateCreateAssignor(values);
  };

  return (
    <main
      className={`flex flex-col items-center justify-center gap-12 p-24 ${style.container}`}
    >
      <div>
        <ModeToggle />
      </div>
      <Image src={logo} alt="bank-me logo" className={style.logo} />
      <h1 className="text-4xl font-bold">Create your account</h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAssignorCreate)}
            className="space-y-8"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="document" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="confirm_password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={style.button}
              disabled={!form.formState.isValid}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

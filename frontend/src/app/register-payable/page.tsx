"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "../../../public/logo-bankme.png";
import useCheckToken from "../hooks/useCheckToken";
import useCreatePayable from "../hooks/useCreatePayable";
import useGetAssignors from "../hooks/useGetAssignors";
import useGetPayable from "../hooks/useGetPayable";
import style from "./page.module.css";

const formSchema = z.object({
  value: z.string({ required_error: "value is required" }).min(2),
  emissionDate: z.date({ required_error: "emissionDate is required" }),
  assignorId: z.string({ required_error: "assignor is required" }).min(2),
});

export default function RegisterPayable() {
  const { push } = useRouter();
  const { data: payables, isLoading } = useGetPayable();
  const {
    mutate: mutateCreatePayable,
  } = useCreatePayable();

  const { data: assignors } = useGetAssignors();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      emissionDate: new Date(),
      assignorId: "",
    },
    disabled: isLoading,
  });

  const getIsTokenExpired = (expDate: number) => {
    const MILLISECONDS_PER_SECOND = 1000;
      return new Date() > new Date(expDate * MILLISECONDS_PER_SECOND);
  }

  useCheckToken();


  const handlePayableCreate = (values: z.infer<typeof formSchema>) => {
    mutateCreatePayable(values);
    push("/payables");
  };

  return (
    <main className={`flex flex-col items-center justify-center p-10 gap-10`}>
      <ModeToggle />
      <Image src={logo} alt="" className={style.logo} />
      <h1 className="text-4xl font-bold">Create a new payable</h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePayableCreate)}
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>value</FormLabel>
                  <FormControl>
                    <Input placeholder="value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emissionDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignorId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      setValue={field.onChange}
                      assignors={assignors ? assignors : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className={style.button} disabled={!form.formState.isValid}>
              Register
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

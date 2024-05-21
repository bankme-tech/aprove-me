"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AssignorCombobox from "./assignor-combobox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayable } from "@/services/payable";

const dateSchema = z.coerce.date();

const formSchema = z.object({
  value: z.coerce.number(),
  emissionDate: z.string().refine(
    (arg) => {
      const isValid = dateSchema.safeParse(arg);
      if (isValid.success) {
        return true;
      }
      return false;
    },
    { message: "invalid date" }
  ),
  assignorId: z.string(),
});

export default function CreatePayableForm() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      emissionDate: "",
      assignorId: "",
    },
  });

  const selectAssignor = (value: string) => {
    form.setValue("assignorId", value);
  };

  const queryClient = useQueryClient();

  const { mutate: createPayableMutation } = useMutation({
    mutationFn: createPayable,
    onSuccess() {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-all-payable"] });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { assignorId, emissionDate, value } = data;
    createPayableMutation({ assignorId, emissionDate, value });
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          form.reset();
          setOpen(value);
        }}
      >
        <DialogTrigger className={buttonVariants()}>
          Create new payable
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Emission date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignorId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Assignor</FormLabel>
                    <AssignorCombobox
                      fieldValue={field.value}
                      selectValue={selectAssignor}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

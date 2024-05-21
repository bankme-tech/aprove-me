"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssignor } from "@/services/assignor";

const formSchema = z.object({
  document: z.string().min(1, { message: "document is required" }).max(30),
  email: z.string().email().max(140),
  phone: z.string().min(1, { message: "phone is required " }).max(20),
  name: z.string().min(1, { message: "name is required" }).max(140),
});

export default function CreateAssignor() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: "",
      email: "",
      phone: "",
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createAssignorMutation } = useMutation({
    mutationFn: createAssignor,
    onSuccess() {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-all-assignor"] });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { document, email, name, phone } = data;
    createAssignorMutation({ document, email, name, phone });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        form.reset();
        setOpen(value);
      }}
    >
      <DialogTrigger className={buttonVariants()}>
        Create new assignor
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New assignor</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
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
                  <FormLabel>Document</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="string" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
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
  );
}

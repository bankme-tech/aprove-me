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
import { Assignor, updateAssignor } from "@/services/assignor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignorSchema } from "@/schemas/assignor-schema";

interface Props {
  assignor: Assignor;
}
export default function UpdateAssignor({ assignor }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof assignorSchema>>({
    resolver: zodResolver(assignorSchema),
    defaultValues: {
      document: assignor.document,
      email: assignor.email,
      phone: assignor.phone,
      name: assignor.name,
    },
  });

  const queryClient = useQueryClient();
  const { mutate: updateAssignorMutation } = useMutation({
    mutationFn: updateAssignor,
    onSuccess() {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["get-assignor-by-id", assignor.id],
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-assignor"] });
    },
  });

  function onSubmit(data: z.infer<typeof assignorSchema>) {
    const { document, email, name, phone } = data;
    updateAssignorMutation({ id: assignor.id, document, email, name, phone });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        form.reset();
        setOpen(value);
      }}
    >
      <DialogTrigger className={buttonVariants()}>Update</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update assignor</DialogTitle>
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

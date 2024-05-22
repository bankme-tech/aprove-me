
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Loading } from "./Loading";
import { Assignor } from "@/interfaces/interfaces";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { api } from "@/api/api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePayableFormData, createPayableFormSchema } from "@/schemas/payable-schemas";
import { createPayable } from "@/actions/payable-actions";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { CreateAssignorFormData, createAssignorFormSchema } from "@/schemas/assignor-schemas";
import { createAssignor } from "@/actions/assignor-actions";



export default function CreateAssignorForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);


    const form = useForm<CreateAssignorFormData>({
      resolver: zodResolver(createAssignorFormSchema),
      defaultValues: {
        document: "",
        email: "",
        name: "",
        phone: "",
      },
    });

    async function handleSubmit(formData: CreateAssignorFormData) {
      setIsLoading(true);
      try {
        await createAssignor(formData);
        router.refresh();
      } catch (error) {
        
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    
    }


  return (
    <Form {...form}>
      <form
      ref={ref}
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-right">Name</FormLabel>
            <FormControl>
              <Input
                id="name"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

        <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="text-right">Document</FormLabel>
                <FormControl>
                <Input
                    id="document"
                    {...field}
                />
                </FormControl>
            </FormItem>
            )}
        />


        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="text-right">Email</FormLabel>
                <FormControl>
                <Input
                    id="email"
                    {...field}
                />
                </FormControl>
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="text-right">Phone</FormLabel>
                <FormControl>
                <Input
                    id="phone"
                    {...field}
                />
                </FormControl>
            </FormItem>
            )}
        />
      

      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" className="disabled:opacity-10 disabled:text-gray-500 disabled:cursor-not-allowed" disabled={isLoading}>
              {isLoading ? <Loading /> : "Save"}
            </Button>
        </DialogClose>

          
      </DialogFooter>
    </form>
  </Form>
  );
}
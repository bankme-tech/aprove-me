
import { useRef, useState } from "react";

import { Input } from "./ui/input";

import { Loading } from "./Loading";
import { Assignor } from "@/interfaces/interfaces";

import { Button } from "./ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { editAssignorFormSchema, EditAssignorFormData } from "@/schemas/assignor-schemas";
import { editAssignor } from "@/actions/assignor-actions";
import { getToken } from "@/lib/utils";
import { useRouter } from "next/navigation";



interface EditAssignorFormProps {
    assignor: Assignor;
}


export default function EditAssignorForm({ assignor }: EditAssignorFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string>(getToken());
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const form = useForm<EditAssignorFormData>({
      resolver: zodResolver(editAssignorFormSchema),
      defaultValues: {
        id: assignor.id,
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      },
    });

    async function handleSubmit(formData: EditAssignorFormData) {
      setIsLoading(true);
      try {
        await editAssignor(formData, token);
        router.push(`/assignor/${assignor.id}`);
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
      
      <Button type="submit" className="disabled:opacity-10 disabled:text-gray-500 disabled:cursor-not-allowed" disabled={isLoading}>
              {isLoading ? <Loading /> : "Edit"}
        </Button>
    </form>
  </Form>
  );
}
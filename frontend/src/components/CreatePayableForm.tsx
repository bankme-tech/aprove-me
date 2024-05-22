
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
import { getToken } from "@/lib/utils";



export default function CreatePayableForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);
    const [token, setToken] = useState<string>(getToken());
    const [data, setData] = useState<Assignor[]>([])

    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);


    const form = useForm<CreatePayableFormData>({
      resolver: zodResolver(createPayableFormSchema),
      defaultValues: {
        value: 0,
        assignorId: "",
      },
    });

    async function handleSubmit(formData: CreatePayableFormData) {
      setIsLoading(true);
      try {
        await createPayable(formData, token);
        router.refresh();
      } catch (error) {
        
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    
    }

    useEffect(() => {

        const fetchAssignors = async () => {
          setFetching(true)
          const { data } = await api.get<Assignor[]>('assignor')
          setData(data)
          setFetching(false)
        }
    
        fetchAssignors()
      }, [])

  return (
    <Form {...form}>
      <form
      ref={ref}
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-right">Value</FormLabel>
            <FormControl>
              <Input
                id="value"
                placeholder="120.00"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
            control={form.control}
            name="assignorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">Assignor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an assignor" />
                  </SelectTrigger>
                </FormControl>
                  <SelectContent>
                    <SelectGroup>
                        {fetching ? <SelectItem value="loading"><Loading/></SelectItem> :
                        data?.map((assignor: Assignor) => (
                            <SelectItem key={assignor.id} value={assignor.id}>
                            {assignor.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
'use client'

import useUpdatePayable from "@/app/hooks/useUpdatePayable";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { DatePicker } from "./ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  value: z.string({ required_error: "value is required" }).min(2),
  emissionDate: z.date({ required_error: "emissionDate is required" }),
  assignorId: z.string({ required_error: "assignor is required" }).min(2),
});

type ModalPayableProps = {
  props: {
    payable: {
      id: string;
      value: string;
      emissionDate: string;
      assignorId: string;
    };
    assignors: {
      id: string;
      name: string;
    }[];
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  };
};

export default function ModalPayable({ props }: ModalPayableProps) {
  const { mutate: mutateUpdateValues } = useUpdatePayable();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: props.payable.value,
      emissionDate: new Date(props.payable.emissionDate),
      assignorId: props.payable.assignorId,
    },
  });

  const handlePayableUpdate = (values: z.infer<typeof formSchema>) => {
    mutateUpdateValues({ id: props.payable.id, payable: values });
    props.setIsOpen(false);
  };

  return (
    <div className="flex justify-center transition-all">
      {props.isOpen && (
        <div className="fixed dark:bg-[#1E293B] bg-black top-20 w-1/3 h-2/3 rounded-3xl transition-all flex justify-center flex-col gap-5 bg-[#1E293B]">
          <h1 className="text-3xl font-bold self-center dark:text-white text-white ">Update your payable</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePayableUpdate)}
              className="space-y-8 flex justify-center items-center flex-col gap-3"
             
            >
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="value"
                        className="dark:bg-[#020817] dark:hover:bg-[#1E293B] bg-white transition"
                        {...field}
                      />
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
                        assignors={props.assignors ? props.assignors : []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  color="failure"
                  type="button"
                  onClick={() => props.setIsOpen(false)}
                >
                  Close
                </Button>

                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20 rounded-lg ml-2"
                  disabled={!form.formState.isValid}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

import useUpdatePayable from "@/app/hooks/useUpdatePayable";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  emissionDate: z.string({ required_error: "emissionDate is required" }),
  assignorId: z.string({ required_error: "assignor is required" }).min(2),
});

type ModalPayableProps = {
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
};

export default function ModalPayable({
  payable,
  assignors,
}: ModalPayableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: mutateUpdateValues } = useUpdatePayable();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignorId: payable.assignorId,
    },
  });

  const handlePayableUpdate = (values: z.infer<typeof formSchema>) =>
    mutateUpdateValues({ id: payable.id, payable: values });

  return (
    <div className="flex justify-center">
      <Button color="default" onPress={onOpen}>
        <Pencil1Icon />
      </Button>
      <Modal
        backdrop="blur"
        className="w-1/3 h-4/3 self-center p-10 rounded-2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex">Modal Title</ModalHeader>
              <ModalBody>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handlePayableUpdate)}
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
                            <Input
                              placeholder="value"
                              className="dark:bg-black transition colors"
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
                              date={
                                field.value ? new Date(field.value) : undefined
                              }
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

                    <div>
                      <Button
                        color="success"
                        variant="light"
                        className="bg-black rounded-lg"
                        onPress={onClose}
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

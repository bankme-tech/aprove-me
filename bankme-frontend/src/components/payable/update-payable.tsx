import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AssignorCombobox from "./assignor-combobox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Payable, updatePayable } from "@/services/payable";
import { convertIsoToYyyyMmDd } from "@/utils/date-formatter";
import { payableSchema } from "@/schemas/payable-schema";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  payable: Payable;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function UpdatePayableForm({
  payable,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<z.infer<typeof payableSchema>>({
    resolver: zodResolver(payableSchema),
    defaultValues: {
      value: payable.value,
      emissionDate: convertIsoToYyyyMmDd(payable.emissionDate),
      assignorId: payable.assignorId,
    },
  });

  const selectAssignor = (value: string) => {
    form.setValue("assignorId", value);
  };

  const queryClient = useQueryClient();
  const { mutate: updatePayableMutation } = useMutation({
    mutationFn: updatePayable,
    onSuccess() {
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["get-all-payable"] });
    },
    onError(err: AxiosError<any>) {
      toast(err.response?.data.message as string);
    },
  });

  function onSubmit(data: z.infer<typeof payableSchema>) {
    const { assignorId, emissionDate, value } = data;
    updatePayableMutation({
      payableId: payable.id,
      assignorId,
      emissionDate,
      value,
    });
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          form.reset();
          onOpenChange(value);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update payable</DialogTitle>
          </DialogHeader>
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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

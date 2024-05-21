import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Payable, playableSchema, PlayableTypes } from "@/types/payables";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DateInput } from "../dateInput/dateInput";
import { AssignorCombobox } from "../assignorCombobox/assignorCombobox";
import { FormError } from "@/components/formError/formError";
import { usePayableStore } from "@/stores/usePayableStore";

interface EditPayableData {
  payable: Payable;
}

export function EditPayableDialog({ payable }: EditPayableData) {
  const editPayable = usePayableStore((state) => state.editPayable);

  const { register, formState, control, handleSubmit } = useForm<PlayableTypes>(
    {
      defaultValues: {
        assignorId: payable.props.assignorId,
        value: payable.props.value,
        emissionDate: payable.props.emissionDate,
      },
      resolver: zodResolver(playableSchema),
    },
  );

  const onSubmit: SubmitHandler<PlayableTypes> = async (data) => {
    await editPayable(data, payable._id);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualize um pagável existente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <label>Selecione um cedente</label>

            <Controller
              control={control}
              name="assignorId"
              render={({ field }) => (
                <AssignorCombobox
                  value={field.value}
                  setValue={field.onChange}
                />
              )}
            />

            <FormError message={formState.errors.assignorId?.message} />
          </div>

          <div>
            <label htmlFor="value">Valor</label>
            <Input
              id="value"
              type="number"
              {...register("value")}
              className="col-span-3"
            />

            <FormError message={formState.errors.value?.message} />
          </div>

          <div>
            <label>Data de emissão</label>

            <Controller
              control={control}
              name="emissionDate"
              defaultValue={payable.props.emissionDate}
              render={({ field }) => (
                <DateInput date={field.value} setDate={field.onChange} />
              )}
            />

            <FormError message={formState.errors.emissionDate?.message} />
          </div>

          <DialogFooter>
            <Button type="submit">
              {formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}{" "}
              Editar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { playableSchema, PlayableTypes } from "@/types/payables";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DateInput } from "../dateInput/dateInput";
import { AssignorCombobox } from "../assignorCombobox/assignorCombobox";
import { FormError } from "@/components/formError/formError";
import { usePayableStore } from "@/stores/usePayableStore";

export function AddPayableDialog() {
  const createPayable = usePayableStore((state) => state.createPayable);

  const { register, formState, control, handleSubmit } = useForm<PlayableTypes>(
    {
      defaultValues: {
        assignorId: "",
        value: undefined,
        emissionDate: undefined,
      },

      resolver: zodResolver(playableSchema),
    },
  );

  const onSubmit: SubmitHandler<PlayableTypes> = async (data) => {
    await createPayable(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Adicionar recebível</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione um novo recebível</DialogTitle>
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
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

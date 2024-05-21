import { FormError } from "@/components/formError/formError";
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
import { useAssignorStore } from "@/stores/useAssignorStore";
import { AssignorTypes, assignorSchema } from "@/types/assignor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function AddAssignorDialog() {
  const [open, setOpen] = useState(false);

  const assignor = useAssignorStore();

  const { register, formState, handleSubmit } = useForm<AssignorTypes>({
    defaultValues: {
      name: "",
      email: "",
      document: "",
      phone: "",
    },

    resolver: zodResolver(assignorSchema),
  });

  const onSubmit: SubmitHandler<AssignorTypes> = async (data) => {
    await assignor.createAssignor(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar cedente</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione um novo cedente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input id="name" {...register("name")} className="col-span-3" />

            <FormError message={formState.errors.name?.message} />
          </div>

          <div>
            <label htmlFor="email" className="text-right">
              email
            </label>
            <Input id="email" {...register("email")} className="col-span-3" />

            <FormError message={formState.errors.email?.message} />
          </div>

          <div>
            <label htmlFor="document" className="text-right">
              CNPJ ou CPF
            </label>
            <Input
              id="document"
              {...register("document")}
              className="col-span-3"
            />

            <FormError message={formState.errors.document?.message} />
          </div>

          <div>
            <label htmlFor="phone" className="text-right">
              Telefone
            </label>
            <Input id="phone" {...register("phone")} className="col-span-3" />

            <FormError message={formState.errors.phone?.message} />
          </div>

          <DialogFooter>
            <Button type="submit">
              {assignor.status === "loading" && (
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

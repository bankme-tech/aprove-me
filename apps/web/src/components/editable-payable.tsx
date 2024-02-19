import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { updatePayable } from '@/services/update-payable';
import { useToast } from './ui/use-toast';
import { Payable } from '@/services/fetch-payable-by-id';
import { useFetchAssignorList } from '@/services/fetch-assignor-list';

type Props = {
  id: string;
  isOpen: boolean;
  initialData: Payable;
  onClose: () => void;
  onEdit: () => void;
};

const formSchema = z.object({
  value: z
    .number({
      invalid_type_error: 'Valor inválido',
      required_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Min. 1' }),
  emissionDate: z.string().min(1, { message: 'Campo obrigatório' }),
  assignor: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
});

type FormData = z.infer<typeof formSchema>;

export const EditablePayable = ({
  id,
  isOpen,
  onClose,
  onEdit,
  initialData,
}: Props) => {
  const { toast } = useToast();
  const { data } = useFetchAssignorList();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignor: initialData.assignorId,
      emissionDate: `${initialData.emissionDate.getFullYear()}-${initialData.emissionDate.getMonth() + 1}-${initialData.emissionDate.getDate()}`,
      value: initialData.value,
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const updateResult = await updatePayable(id, {
      assignorId: data.assignor,
      emissionDate: data.emissionDate,
      value: data.value,
    });

    if (!updateResult.success) {
      updateResult.error?.forEach((error) => {
        switch (error) {
          case 'assignor_invalid_id':
            setError('assignor', { message: 'Cedente inválido.' });
            break;
          case 'assignor_not_found':
            setError('assignor', { message: 'Cedente inválido.' });
            break;
          case 'invalid_emission_date':
            setError('emissionDate', { message: 'Data inválida' });
            break;
          case 'invalid_value':
            setError('value', { message: 'Valor inválido' });
            break;
          default:
            toast({
              title: error,
            });
        }
      });
      return;
    }

    toast({
      title: 'Pagável editado com sucesso!',
    });

    onEdit();
    onClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar pagável</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value">Valor:</Label>
            <div className="col-span-3">
              <Input
                id="value"
                {...register('value', {
                  valueAsNumber: true,
                })}
                type="number"
              />
              {errors.value?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left col-span-3">
                  {errors.value.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emissionDate">Data de emissão:</Label>
            <div className="col-span-3">
              <Input
                id="emissionDate"
                {...register('emissionDate')}
                type="date"
              />
              {errors.emissionDate?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left">
                  {errors.emissionDate.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignor">Cedente:</Label>
            <div className="col-span-3">
              <Controller
                name="assignor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {data.map((assignor) => (
                        <SelectItem key={assignor.id} value={assignor.id}>
                          {assignor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.assignor?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left col-span-4">
                  {errors.assignor.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

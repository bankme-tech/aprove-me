import React from 'react';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { useForm } from 'react-hook-form';
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
import { useToast } from './ui/use-toast';
import { Assignor } from '@/services/fetch-assignor-by-id';
import { updateAssignor } from '@/services/update-assignor';

type Props = {
  assignorId: string;
  isOpen: boolean;
  initialData: Assignor;
  onClose: () => void;
  onEdit: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  document: z
    .string()
    .min(11, { message: 'Campo obrigatório' })
    .refine(
      (value) => cpf.isValid(value) || cnpj.isValid(value),
      'Documento inválido',
    ),
  email: z
    .string()
    .email('E-mail inválido')
    .min(1, { message: 'Campo obrigatório' }),
  phone: z
    .string()
    .min(11, { message: 'Mínimo 11 caracteres' })
    .max(20, { message: 'Máximo 20 caracteres' })
    .refine((value) => !/[^0-9]/g.test(value), 'Telefone inválido'),
});

type FormData = z.infer<typeof formSchema>;

export const EditableAssignor = ({
  assignorId,
  isOpen,
  onClose,
  onEdit,
  initialData,
}: Props) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: initialData.document,
      email: initialData.email,
      name: initialData.name,
      phone: initialData.phone,
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const updateResult = await updateAssignor(assignorId, {
      document: data.document,
      email: data.email,
      name: data.name,
      phone: data.phone,
    });
    if (!updateResult.success) {
      updateResult.error?.forEach((error) => {
        switch (error) {
          case 'assignor_already_exists':
            setError('document', { message: 'Documento já registrado.' });
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
      title: 'Cedente atualizado com sucesso!',
    });

    onClose();
    onEdit();
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Cedente</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value">Nome:</Label>
            <div className="col-span-3">
              <Input id="name" {...register('name')} />
              {errors.name?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left col-span-3">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emissionDate">CPF/CNPJ:</Label>
            <div className="col-span-3">
              <Input id="document" {...register('document')} />
              {errors.document?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left">
                  {errors.document.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emissionDate">E-mail:</Label>
            <div className="col-span-3">
              <Input id="email" {...register('email')} />
              {errors.email?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emissionDate">Telefone:</Label>
            <div className="col-span-3">
              <Input id="phone" {...register('phone')} type="tel" />
              {errors.phone?.message && (
                <span className="text-red-400 text-sm -mt-1 text-left">
                  {errors.phone.message}
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

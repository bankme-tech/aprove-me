import { ErrorForm } from '@/components/error-form';
import { Button, Input, Label } from '@/components/ui';
import { Api } from '@/services/api';
import { AssignorSchema, assignorSchema } from '@/types/assignor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const AssignorForm = () => {
  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: Api.createAssignor,
    onError: () => {
      toast.error('Algo de errado aconteceu');
    },
    onSuccess: () => {
      toast.success('Recebível criado com sucesso');
      reset();
      query.refetchQueries({
        queryKey: ['fetch-assignors'],
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignorSchema>({
    resolver: zodResolver(assignorSchema),
  });

  const handleSubmitAssignorForm = (data: AssignorSchema) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitAssignorForm)}
      className="space-y-2"
    >
      <div className="space-y-1">
        <Label htmlFor="document">Documento</Label>
        <Input
          id="document"
          placeholder="CPNJ ou CPF"
          {...register('document')}
        />
        {errors.document?.message && (
          <ErrorForm message={errors.document.message} />
        )}
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input placeholder="example@email.com" {...register('email')} />
        {errors.email?.message && <ErrorForm message={errors.email.message} />}
      </div>

      <div className="space-y-1">
        <Label>Telefone para contato</Label>
        <Input placeholder="99 99999 9999" {...register('phone')} />
        {errors.phone?.message && <ErrorForm message={errors.phone.message} />}
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="John doe" {...register('name')} />
        {errors.name?.message && <ErrorForm message={errors.name.message} />}
      </div>

      <Button type="submit">Criar</Button>
    </form>
  );
};

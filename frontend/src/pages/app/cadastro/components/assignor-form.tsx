import { Button, Input, Label } from '@/components/ui';
import { AssignorSchema, assignorSchema } from '@/types/assignor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const AssignorForm = () => {
  const { register, handleSubmit } = useForm<AssignorSchema>({
    resolver: zodResolver(assignorSchema),
  });

  const handleSubmitAssignorForm = (data: AssignorSchema) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitAssignorForm)}
      className="space-y-2"
    >
      <div className="space-y-1">
        <Label>Documento</Label>
        <Input placeholder="CPNJ ou CPF" {...register('document')} />
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input placeholder="example@email.com" {...register('email')} />
      </div>

      <div className="space-y-1">
        <Label>Telefone para contato</Label>
        <Input placeholder="99 99999 9999" {...register('phone')} />
      </div>

      <div className="space-y-1">
        <Label>Nome</Label>
        <Input placeholder="John doe" {...register('name')} />
      </div>

      <Button type="submit">Criar</Button>
    </form>
  );
};

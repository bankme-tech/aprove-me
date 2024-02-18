import { ErrorForm } from '@/components/error-form';
import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { ReceivableSchema, receivableSchema } from '@/types/receivable';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectorAssignor } from './select-assignor';
import { useMutation } from '@tanstack/react-query';
import { Api } from '@/services/api';

export const ReceivableForm = () => {
  const { mutate } = useMutation({
    mutationFn: Api.createReceivable,
    onError: () => {
      toast.error('Algum erro ocorreu');
    },
    onSuccess: () => {
      toast.success('Recebivel criado com sucesso');
      reset();
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReceivableSchema>({
    resolver: zodResolver(receivableSchema),
  });

  const handleSubmitReceivableForm = (data: ReceivableSchema) => {
    mutate(data);
  };

  return (
    <form
      className="space-y-2"
      onSubmit={handleSubmit(handleSubmitReceivableForm)}
    >
      <div className="space-y-1">
        <Label>Selecione um cedente</Label>
        <Controller
          name={'assignor_id'}
          control={control}
          render={({ field }) => (
            <SelectorAssignor onChange={field.onChange} value={field.value} />
          )}
        />
        {errors.assignor_id?.message && (
          <ErrorForm message={errors.assignor_id.message} />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Data</Label>
        <Controller
          control={control}
          name="emission_date"
          defaultValue={undefined}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'ghost'}
                  className={cn(
                    'justify-start border text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.emission_date?.message && (
          <ErrorForm message={errors.emission_date.message} />
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="value">Valor</Label>
        <div className="flex items-center">
          <label
            htmlFor="value"
            className="flex h-9 items-center justify-center rounded-md rounded-r-none border border-r-0 px-2 py-1 text-xs font-medium"
          >
            R$
          </label>
          <Input
            id="value"
            type="number"
            step={0.01}
            min={0.01}
            placeholder="Valor do recebível"
            {...register('value')}
            className="rounded-l-none border-l-0 pl-px"
          />
        </div>
        {errors.value?.message && <ErrorForm message={errors.value.message} />}
      </div>

      <Button type="submit">Criar</Button>
    </form>
  );
};

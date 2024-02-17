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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ReceivableSchema, receivableSchema } from '@/types/receivable';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectorAssignor } from './select-assignor';

export const ReceivableForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReceivableSchema>({
    resolver: zodResolver(receivableSchema),
  });

  const handleSubmitReceivableForm = (data: ReceivableSchema) => {
    toast.info(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cedente" />
              </SelectTrigger>
              <SelectContent>
                <SelectorAssignor />
              </SelectContent>
            </Select>
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
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
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
            step={0.1}
            placeholder="Valor do recebível"
            {...register('value')}
            className="rounded-l-none border-l-0"
          />
        </div>
        {errors.value?.message && <ErrorForm message={errors.value.message} />}
      </div>

      <Button type="submit">Criar</Button>
    </form>
  );
};

import { useParams } from 'react-router-dom';
import { PayableSchema, PayableType, payableSchema } from '../types';
import { useState } from 'react';
import Title from '../components/ui/title';
import FormCard from '../components/formCard';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import ErrorMessage from '../components/ui/errorMessage';
import { editPayable, getPayable } from '../services/payable';
import { UUID } from 'crypto';

export default function ViewPayable() {
  const { id } = useParams<{ id: UUID }>();
  const [isDirty, setIsDirty] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: {
      errors,
      defaultValues,
    },
  } = useForm<PayableSchema>({
    resolver: zodResolver(payableSchema),
    defaultValues: async () => {
      const data = await getPayable(id as UUID)
      return {
        value: data.value,
        emissionDate: new Date(data.emissionDate).toISOString().substring(0, 10) as unknown as Date,
        assignor: data.assignorRef.name
      }
    },
  })
  const onSubmit: SubmitHandler<PayableSchema> = async (data) => {
    if (
      new Date(data.emissionDate).toISOString().substring(0, 10) as unknown as Date === defaultValues?.emissionDate &&
      data.value === defaultValues.value
    ) {
      reset();
      setIsDirty(false)
      return
    }

    try {
      const res = await editPayable({
        id: id,
        value: data.value,
        emissionDate: new Date(data.emissionDate).toISOString().substring(0, 10)
      })
      setIsDirty(false)
    } catch (error) {
      setError("root", { message: 'Erro ao salvar as alterações.' })
    }

  }

  const onError = () => {
    setError("root", { message: 'Preencha todos os campos corretamente para salvar.' })
  }

  return (
    <div className='flex flex-col items-center w-full gap-6'>
      <Title>Pagável criado:</Title>
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-3">
          <ErrorMessage error={errors.root} />
          <Input
            label='Id'
            value={id}
            disabled
          />
          <Input
            label='Valor'
            register={register('value', {onChange: () => setIsDirty(true)})}

          />
          <Input
            label='Data de emissão'
            type="date"
            register={register('emissionDate', {onChange: () => setIsDirty(true)})}
          />
          <Input
            label='Cedente'
            register={register('assignor', { disabled: true })}
          />
          <Button
            className={isDirty ?
              '' :
              'bg-opacity-40 hover:bg-opacity-40'
            }
          >
            Salvar alterações
          </Button>
        </form>
      </FormCard>
    </div>
  )
}
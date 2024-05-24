'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Inbox, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SelectAssignor } from '@/components/select-assignor';
import { useAPI } from '@/hooks/useAPI';
import {
  createPayableSchema,
  type CreatePayableSchema,
} from '@/schemas/payables/create-payable-schema';
import type { Nullable } from '@/utils/types';

interface Props {
  mode?: 'EDIT' | 'CREATE';
  defaultValues: Nullable<CreatePayableSchema>;
}

export const Form: React.FC<Props> = ({
  mode = 'CREATE',
  defaultValues: df,
}) => {
  const [payablesBatch, setPayablesBatch] = React.useState<
    CreatePayableSchema[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const batch = searchParams.get('batch') === 'true';

  const { api } = useAPI();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreatePayableSchema>({
    defaultValues: df as CreatePayableSchema,
    resolver: zodResolver(createPayableSchema),
  });

  const onSubmit = async (data: CreatePayableSchema) => {
    if (batch) {
      setPayablesBatch((prevState) => {
        const newState = [...prevState];
        newState.push(data);
        return newState;
      });
    } else {
      try {
        setIsLoading(true);
        await api.payables.create(data);
        toast.success('Payable successfully created');
        reset();
      } catch (error) {
        toast.error('An error ocurred while trying to create payable');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onCreateBatch = async () => {
    try {
      setIsLoading(true);
      await api.payables.createBatch({ payables: payablesBatch });
      toast.success('Scheduled payables batch process');
      reset();
      setPayablesBatch([]);
    } catch (error) {
      toast.error('An error ocurred while trying to create payable batch');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Value</span>
          </div>
          <input
            {...register('value')}
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
          />

          {errors.value && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.value.message}
              </span>
            </div>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Emission date</span>
          </div>
          <input
            type="date"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
            {...register('emissionDate')}
          />
          {errors.emissionDate && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.emissionDate.message}
              </span>
            </div>
          )}
        </label>

        <Controller
          control={control}
          name="assignor"
          render={({ field: { onChange } }) => (
            <>
              <SelectAssignor onChange={(id) => onChange(id)} />
              {errors.assignor && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors.assignor.message}
                  </span>
                </div>
              )}
            </>
          )}
        />

        <div className="flex w-full justify-end">
          {batch ? (
            <button className="btn btn-outline btn-sm mt-8">
              <Plus size={18} />
              Add to batch
            </button>
          ) : (
            <button className="btn btn-primary btn-sm mt-8">
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Create'
              )}
            </button>
          )}
        </div>
      </form>
      {batch && (
        <div className="mt-8">
          <div className="flex w-full justify-between">
            <h1 className="text-2xl">Batch</h1>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onCreateBatch}
            >
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                'Create'
              )}
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            {payablesBatch.length > 0 ? (
              <>
                {payablesBatch.map((p, idx) => (
                  <div
                    className="mt-4 flex w-full flex-col gap-2 rounded-md border border-gray-800 p-4"
                    key={idx}
                  >
                    <span>$ {p.value}</span>
                    <span>{dayjs(p.emissionDate).format('DD/MM/YYYY')}</span>
                    <span>{p.assignor}</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-2 text-sm">
                <div className="rounded-full bg-zinc-800 p-2">
                  <div className="rounded-full bg-zinc-700 p-4">
                    <Inbox size={32} />
                  </div>
                </div>
                <span>Add a payable to see creation list</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

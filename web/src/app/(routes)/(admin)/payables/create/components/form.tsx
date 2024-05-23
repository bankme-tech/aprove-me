'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Inbox, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SelectAssignor } from '@/components/select-assignor';
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
  const searchParams = useSearchParams();
  const batch = searchParams.get('batch') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreatePayableSchema>({
    defaultValues: df as CreatePayableSchema,
    resolver: zodResolver(createPayableSchema),
  });

  const onSubmit = (data: CreatePayableSchema) => {
    console.log('data: ', data);
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
            {...register('emissionDate')}
            type="date"
            placeholder="Type here"
            className="input input-sm input-bordered w-full"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>

        <Controller
          control={control}
          name="assignor"
          render={({ field: { onChange } }) => (
            <SelectAssignor onChange={(id) => onChange(id)} />
          )}
        />

        <div className="flex w-full justify-end">
          {batch ? (
            <button className="btn btn-outline btn-sm mt-8">
              <Plus size={18} />
              Add to batch
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-sm mt-8">
              Create
            </button>
          )}
        </div>
      </form>
      {batch && (
        <div className="mt-8">
          <div className="flex w-full justify-between">
            <h1 className="text-2xl">Batch</h1>
            <button type="button" className="btn btn-primary btn-sm">
              Create
            </button>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center p-2 text-sm">
              <div className="rounded-full bg-zinc-800 p-2">
                <div className="rounded-full bg-zinc-700 p-4">
                  <Inbox size={32} />
                </div>
              </div>
              <span>Add a payable to see creation list</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

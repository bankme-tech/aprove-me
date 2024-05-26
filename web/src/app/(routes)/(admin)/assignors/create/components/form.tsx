/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAPI } from '@/hooks/useAPI';
import {
  createAssignorSchema,
  type CreateAssignorSchema,
} from '@/schemas/assignors/create-assignor-schema';
import type { Nullable } from '@/utils/types';

interface Props {
  mode?: 'EDIT' | 'CREATE';
  defaultValues: Nullable<CreateAssignorSchema>;
  id?: string;
}

export const Form: React.FC<Props> = ({
  mode = 'CREATE',
  defaultValues: df,
  id,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { api } = useAPI();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAssignorSchema>({
    defaultValues: df as any,
    resolver: zodResolver(createAssignorSchema),
  });

  const onSubmit = async (data: CreateAssignorSchema) => {
    switch (mode) {
      case 'CREATE':
        try {
          setIsLoading(true);
          await api.assignors.create(data);
          toast.success('Payable successfully created');
          reset();
        } catch (error) {
          toast.error('An error ocurred while trying to create payable');
        } finally {
          setIsLoading(false);
        }
        break;
      case 'EDIT':
        try {
          setIsLoading(true);
          await api.assignors.update({
            partialCreateAssignor: data,
            id: id as string,
          });
          toast.success('Payable successfully created');
        } catch (error) {
          toast.error('An error occured while trying to update');
        } finally {
          setIsLoading(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Document</span>
          </div>
          <input
            {...register('document')}
            type="text"
            placeholder="Type here document"
            className="input input-sm input-bordered w-full"
          />

          {errors.document && (
            <div className="label">
              <span
                className="label-text-alt text-error"
                data-testid="document-error-message"
              >
                {errors.document.message}
              </span>
            </div>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Type here email"
            className="input input-sm input-bordered w-full"
            {...register('email')}
          />
          {errors.email && (
            <div className="label">
              <span
                className="label-text-alt text-error"
                data-testid="email-error-message"
              >
                {errors.email.message}
              </span>
            </div>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here name"
            className="input input-sm input-bordered w-full"
            {...register('name')}
          />
          {errors.name && (
            <div className="label">
              <span
                className="label-text-alt text-error"
                data-testid="name-error-message"
              >
                {errors.name.message}
              </span>
            </div>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            placeholder=" phone"
            className="input input-sm input-bordered w-full"
            {...register('phone')}
          />
          {errors.phone && (
            <div className="label">
              <span
                className="label-text-alt text-error"
                data-testid="phone-error-message"
              >
                {errors.phone.message}
              </span>
            </div>
          )}
        </label>

        <div className="flex w-full justify-end">
          <button type="submit" className="btn btn-primary btn-sm mt-8">
            {isLoading ? (
              <span className="loading loading-spinner" />
            ) : (
              <>{mode === 'CREATE' ? 'Create' : 'Update'}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

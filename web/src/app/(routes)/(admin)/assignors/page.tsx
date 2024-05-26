/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

import { AppRoutes } from '@/constants/app-routes';
import { useAPI } from '@/hooks/useAPI';
import type { AssignorModel } from '@/services/models/assignor-model';

export const AssignorsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [assignors, setAssignors] = React.useState<AssignorModel[]>([]);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const { api } = useAPI();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await api.assignors.findAll();
      setAssignors(data.assignors);
    } catch (error) {
      toast.error('An error occured while trying to fetch assignors');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onDelete = async ({
    id,
    onSuccess,
  }: {
    id: string;
    onSuccess?: () => void;
  }) => {
    try {
      setIsDeleteLoading(true);
      await api.assignors.delete(id);
      toast.success('Payable successfully deleted');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('An error occured while trying to delete payable');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-content flex-col items-center justify-center px-4 pt-20">
        <span className="loading loading-spinner" />
      </main>
    );
  }

  return (
    <main className="flex min-h-content flex-col items-center px-4 pt-20">
      <div className="w-full max-w-7xl overflow-x-auto">
        <h1 className="text-2xl">Assignors</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Document</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assignors.map((p, idx) => (
              <tr key={p.id}>
                <th>{idx + 1}</th>
                <td>{p.document}</td>
                <td>{p.email}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={AppRoutes.assignors.edit.replace(':id', p.id)}
                      className="btn btn-primary btn-sm"
                    >
                      <Pen size={18} />
                    </Link>

                    <a
                      href="#my_modal_8"
                      className="btn btn-outline btn-error btn-sm"
                      data-testid={`modal-trigger-${p.id}`}
                    >
                      <Trash size={18} />
                    </a>

                    <div className="modal" role="dialog" id="my_modal_8">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">Delete payable</h3>

                        <div className="modal-action">
                          <a id="cancel" href="#" className="btn btn-sm">
                            Cancel
                          </a>
                          <button
                            data-testid={`delete-trigger-${p.id}`}
                            className="btn btn-error btn-sm"
                            onClick={() => {
                              onDelete({
                                id: p.id,
                                onSuccess: () => {
                                  loadData();
                                  document?.getElementById('cancel')?.click();
                                },
                              });
                            }}
                          >
                            {isDeleteLoading ? (
                              <span className="loading loading-spinner" />
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AssignorsPage;

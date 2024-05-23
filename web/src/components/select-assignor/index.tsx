'use client';

import React from 'react';
import { toast } from 'sonner';

import { useAPI } from '@/hooks/useAPI';
import type { AssignorModel } from '@/services/models/assignor-model';

interface Props {
  onChange: (id: string | null) => void;
}

export const SelectAssignor: React.FC<Props> = ({ onChange }) => {
  const { api } = useAPI();
  const [assignors, setAssignors] = React.useState<AssignorModel[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await api.assignors.findAll();
        setAssignors(data.assignors);
      } catch (error) {
        toast.error('It was not possible to fetch assignors');
      }
    })();
  }, []);

  return (
    <>
      <label htmlFor="my_modal_7">
        <div className="label">
          <span className="label-text">Assignor</span>
        </div>
        <div className="input input-sm w-full cursor-pointer rounded-md border border-zinc-800">
          selecionado
        </div>
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <div className="flex flex-col p-4">
            {assignors.map((a) => (
              <button
                className="form-control"
                key={a.id}
                type="button"
                onClick={() => setSelectedId(a.id)}
              >
                <label className="label cursor-pointer">
                  <span className="label-text">{a.name}</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio radio-sm checked:bg-primary"
                    checked
                  />
                </label>
              </button>
            ))}
          </div>
          <div className="modal-action">
            <label
              htmlFor="my_modal_7"
              className="btn"
              role="button"
              onClick={() => {
                onChange(selectedId);
              }}
            >
              Confirm
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

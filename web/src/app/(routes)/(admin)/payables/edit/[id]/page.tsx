'use client';

import dayjs from 'dayjs';
import type { NextPage } from 'next';
import React from 'react';
import { toast } from 'sonner';

import { useAPI } from '@/hooks/useAPI';
import type { PayableModel } from '@/services/models/payable-model';

import { Form } from '../../create/components/form';

interface Props {
  params: {
    id: string;
  };
}

const EditPayablePage: NextPage<Props> = ({ params }) => {
  const [defaultValue, setDefaultValue] = React.useState<PayableModel | null>(
    null,
  );

  const { api } = useAPI();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await api.payables.find(params.id);
        setDefaultValue(data);
      } catch (error) {
        toast.error('An error occured while trying to fetch payable');
      }
    })();
  }, [api.payables, params.id]);

  if (defaultValue) {
    return (
      <main className="flex min-h-content flex-col items-center px-4 pt-20">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl">Update payable</h1>

          <Form
            id={params.id}
            defaultValues={{
              value: defaultValue.value,
              emissionDate: dayjs(defaultValue.emissionDate).format(
                'YYYY-MM-DD',
              ),
              assignor: defaultValue.assignor,
            }}
            mode="EDIT"
          />
        </div>
      </main>
    );
  }

  return null;
};

export default EditPayablePage;

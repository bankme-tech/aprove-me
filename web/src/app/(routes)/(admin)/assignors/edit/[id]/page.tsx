'use client';

import type { NextPage } from 'next';
import React from 'react';
import { toast } from 'sonner';

import { useAPI } from '@/hooks/useAPI';
import type { AssignorModel } from '@/services/models/assignor-model';

import { Form } from '../../create/components/form';

interface Props {
  params: {
    id: string;
  };
}

const EditPayablePage: NextPage<Props> = ({ params }) => {
  const [defaultValue, setDefaultValue] = React.useState<AssignorModel | null>(
    null,
  );

  const { api } = useAPI();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await api.assignors.find(params.id);
        setDefaultValue(data);
      } catch (error) {
        toast.error('An error occured while trying to fetch assignor');
      }
    })();
  }, [api.assignors, params.id]);

  if (defaultValue) {
    return (
      <main className="flex min-h-content flex-col items-center px-4 pt-20">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl">Update assignor</h1>

          <Form
            id={params.id}
            defaultValues={{
              document: defaultValue.document,
              email: defaultValue.email,
              phone: defaultValue.phone,
              name: defaultValue.name,
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

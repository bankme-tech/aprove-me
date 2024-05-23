import type React from 'react';

import { BatchToggle } from './components/batch-toggle';
import { Form } from './components/form';

export const CreatePayables: React.FC = () => (
  <main className="flex min-h-content flex-col items-center pt-20">
    <div className="w-full max-w-7xl">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl">Create payable</h1>

        <BatchToggle />
      </div>

      <Form
        defaultValues={{ value: null, emissionDate: null, assignor: null }}
      />
    </div>
  </main>
);

export default CreatePayables;

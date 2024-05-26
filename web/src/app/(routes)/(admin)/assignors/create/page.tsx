import type React from 'react';

import { Form } from './components/form';

export const CreatePayables: React.FC = () => (
  <main className="flex min-h-content flex-col items-center px-4 pt-20">
    <div className="w-full max-w-7xl">
      <h1 className="text-2xl">Create assignor</h1>

      <Form
        defaultValues={{ document: null, email: null, name: null, phone: null }}
      />
    </div>
  </main>
);

export default CreatePayables;

import type { NextPage } from 'next';
import Image from 'next/image';

import { Form } from './components/form';

const LoginPage: NextPage = () => (
  <main className="flex">
    <Form />

    <div className="relative h-screen w-1/2 overflow-hidden">
      <Image
        src="/background.webp"
        alt="bankme background image"
        layout="fill"
        objectFit="cover"
      />
    </div>
  </main>
);

export default LoginPage;

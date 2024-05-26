import type { NextPage } from 'next';
import Image from 'next/image';

import { Form } from './components/form';

const Register: NextPage = () => (
  <main className="flex">
    <div className="relative h-screen w-1/2 overflow-hidden">
      <Image
        src="/background.webp"
        alt="bankme background image"
        layout="fill"
        objectFit="cover"
      />
    </div>

    <Form />
  </main>
);

export default Register;

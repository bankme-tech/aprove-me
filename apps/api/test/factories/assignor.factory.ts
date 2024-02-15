import { Assignor } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { randomUUID } from 'crypto';

type Override = Partial<Assignor>;

export function makeAssignor(override?: Override): Assignor {
  return {
    id: randomUUID(),
    document: cpf.generate(false),
    email: 'johndoe@mail.com',
    name: 'John Doe',
    phone: '4398765434',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

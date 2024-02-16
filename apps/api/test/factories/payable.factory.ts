import { Payable } from '@prisma/client';
import { randomUUID } from 'crypto';

type Override = Partial<Payable>;

export function makePayable(override?: Override): Payable {
  return {
    id: randomUUID(),
    assignorId: 'assingor-id',
    emissionDate: new Date(),
    value: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

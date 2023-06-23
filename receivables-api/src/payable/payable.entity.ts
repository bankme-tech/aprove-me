import { Prisma } from '@prisma/client';

export class PayableEntity implements Prisma.PayableCreateInput {
  id: string;
  value: number;
  emissionDate: Date;
  assignor: number;
}

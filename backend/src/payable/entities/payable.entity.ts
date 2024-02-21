import { Assignor } from '@prisma/client';

export class Payable {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
  assignor?: Assignor;
}

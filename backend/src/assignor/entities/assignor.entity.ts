import { Payable } from '@prisma/client';

export class Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  Payables?: Payable[];
}

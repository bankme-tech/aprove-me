import { Prisma } from '@prisma/client';

export class AssignorEntity implements Prisma.AssignorCreateInput {
  document: string;
  email: string;
  phone: string;
  name: string;
}

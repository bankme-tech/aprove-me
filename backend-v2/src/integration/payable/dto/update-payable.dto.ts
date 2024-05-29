import { Prisma } from "@prisma/client";

export class UpdatePayableDto implements Prisma.PayableUpdateInput {
  id?: string;
  amount?: number;
  emissionDate?: Date;
  assignorId?: string;
}
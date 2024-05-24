import { Payable } from '@modules/payable/entities/payable.entity';
import {
  Prisma,
  Payable as PrismaPayable,
  Assignor as PrismaAssignor,
} from '@prisma/client';

export class PrismaPayableMapper {
  static toPrisma(payable): Prisma.PayableUncheckedCreateInput {
    return {
      id: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignorId: payable.assignorId,
    } as PrismaPayable;
  }

  static toDomain(payable: PrismaPayable, assignor: PrismaAssignor) {
    return Payable.create(
      {
        assignorId: payable.assignorId,
        value: payable.value,
        emissionDate: payable.emissionDate,
        assignor: assignor,
      },
      payable.id,
    );
  }
}

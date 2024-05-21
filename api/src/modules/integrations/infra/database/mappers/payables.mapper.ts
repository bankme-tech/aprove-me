import { Payable as PrismaPayable } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Payable } from '@/modules/integrations/domain/entities/payable.entity';

export class PayablesMapper {
  public static toDomain(payable: PrismaPayable): Payable {
    return new Payable({
      id: payable.id,
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignor: payable.assignor,
      createdAt: payable.createdAt,
      updatedAt: payable.updatedAt,
    });
  }
  public static toPersist(payable: Payable): Prisma.PayableCreateInput {
    return {
      value: payable.value,
      emissionDate: payable.emissionDate,
      assignor: payable.assignor,
    };
  }
}

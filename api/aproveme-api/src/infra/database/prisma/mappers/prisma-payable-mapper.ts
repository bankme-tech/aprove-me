import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Payable } from "@/domain/receivables/enterprise/entities/payable";
import { Prisma, Payable as PrismaPayable } from "@prisma/client";

export class PrismaPayableMapper {
  static toDomain(raw: PrismaPayable): Payable {
    return Payable.create(
      {
        assignorId: new UniqueEntityId(raw.assignorId),
        emissionDate: raw.emissionDate,
        value: raw.value,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toPrisma(payable: Payable): Prisma.PayableUncheckedCreateInput {
    return {
      id: payable.id.toString(),
      assignorId: payable.assignorId.toString(),
      emissionDate: payable.emissionDate,
      value: payable.value,
    };
  }
}

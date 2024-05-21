import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Payable } from "@/domain/receivables/enterprise/entities/payable";
import { PayableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/payable-with-assignor";
import {
  Prisma,
  Payable as PrismaPayable,
  Assignor as PrismaAssignor,
} from "@prisma/client";

type PrismaPayableWithAssignor = PrismaPayable & {
  assignor: PrismaAssignor;
};

export class PrismaPayableWithAssignorMapper {
  static toDomain(raw: PrismaPayableWithAssignor): PayableWithAssignor {
    return PayableWithAssignor.create({
      payableId: new UniqueEntityId(raw.id),
      value: raw.value,
      emissionDate: raw.emissionDate,
      assignor: {
        id: new UniqueEntityId(raw.assignor.id),
        document: raw.assignor.document,
        email: raw.assignor.email,
        name: raw.assignor.name,
        phone: raw.assignor.phone,
      },
    });
  }
}

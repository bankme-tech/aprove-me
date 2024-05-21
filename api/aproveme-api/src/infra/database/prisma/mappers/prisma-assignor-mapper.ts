import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";
import { Prisma, Assignor as PrismaAssignor } from "@prisma/client";

export class PrismaAssignorMapper {
  static toDomain(raw: PrismaAssignor): Assignor {
    return Assignor.create(
      {
        document: raw.document,
        email: raw.email,
        name: raw.name,
        phone: raw.phone,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toPrisma(assignor: Assignor): Prisma.AssignorUncheckedCreateInput {
    return {
      id: assignor.id.toString(),
      document: assignor.document,
      email: assignor.email,
      name: assignor.name,
      phone: assignor.phone,
    };
  }
}

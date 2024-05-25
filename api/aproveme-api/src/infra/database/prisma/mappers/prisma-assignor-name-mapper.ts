import { AssignorName } from "@/domain/receivables/enterprise/entities/value-object/assignor-name";
import { Assignor as PrismaAssignor } from "@prisma/client";

export class PrismaAssignorNameMapper {
  static toDomain(raw: PrismaAssignor): AssignorName {
    return AssignorName.create({
      id: raw.id,
      name: raw.name,
    });
  }
}

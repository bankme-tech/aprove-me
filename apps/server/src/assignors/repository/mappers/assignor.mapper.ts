import { Assignor } from '@/assignors/entities/assignor.entity'
import { Prisma, Assignor as PrismaAssignor } from '@prisma/client'

export class PrismaAssignorMapper {
  static toDomain(raw: PrismaAssignor): Assignor {
    return Assignor.create(
      {
        document: raw.document,
        email: raw.email,
        name: raw.name,
        phone: raw.phone,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(assignor: Assignor): Prisma.AssignorUncheckedCreateInput {
    return {
      id: assignor.id,
      document: assignor.document,
      email: assignor.email,
      name: assignor.name,
      phone: assignor.phone,
      createdAt: assignor.createdAt,
      updatedAt: assignor.updatedAt,
    }
  }
}

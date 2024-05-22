import { Assignor as PrismaAssignor } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Assignor } from 'src/domain/operations/enterprise/entities/assignor';

export abstract class PrismaAssignorMapper {
  static toDomain(raw: PrismaAssignor): Assignor {
    return Assignor.create({
      document: raw.document,
      email: raw.email,
      phone: raw.phone,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityID(raw.id))
  }
}
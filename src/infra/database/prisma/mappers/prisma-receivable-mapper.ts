import { Prisma, Receivable as PrismaReceivable } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Receivable } from 'src/domain/operations/enterprise/entities/receivable';

export abstract class PrismaReceivableMapper {
  static toDomain(raw: PrismaReceivable): Receivable {
    return Receivable.create({
      assignor: raw.assignorId,
      emissionDate: raw.emissionDate,
      value: raw.value,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityID(raw.id))
  }


  static toPrisma(raw: Receivable): Prisma.ReceivableUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      assignorId: raw.assignor,
      emissionDate: raw.emissionDate,
      value: raw.value,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }
  }
}
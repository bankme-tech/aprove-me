import { Payable } from '@/payable/entities/payable.entity'
import { Prisma, Payable as PrismaPayable } from '@prisma/client'

export class PrismaPayableMapper {
  static toDomain(raw: PrismaPayable): Payable {
    return Payable.create(
      {
        value: raw.value,
        assignorId: raw.assignorId,
        emissionDate: raw.emissionDate,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
        payedAt: raw.payedAt,
      },
      raw.id,
    )
  }

  static toPrisma(payable: Payable): Prisma.PayableUncheckedCreateInput {
    return {
      id: payable.id,
      value: payable.value,
      assignorId: payable.assignorId,
      emissionDate: payable.emissionDate,
      createdAt: payable.createdAt,
      canceledAt: payable.canceledAt,
      payedAt: payable.payedAt,
    }
  }
}

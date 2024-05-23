import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/database/prisma.service'
import { Payable } from '../entities/payable.entity'
import { PrismaPayableMapper } from './mappers/payable.mapper'

@Injectable()
export class PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable)
    await this.prisma.payable.create({ data })
  }

  async findById(id: string): Promise<Payable | null> {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    })
    if (!payable) return null

    return PrismaPayableMapper.toDomain(payable)
  }

  async save(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable)
    await this.prisma.payable.update({
      where: { id: payable.id },
      data,
    })
  }

  async delete(payableId: string): Promise<void> {
    this.prisma.payable.delete({
      where: { id: payableId },
    })
  }
}

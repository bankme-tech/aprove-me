import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/database/prisma.service'
import { Assignor } from '../entities/assignor.entity'
import { PrismaAssignorMapper } from './mappers/assignor.mapper'

@Injectable()
export class AssignorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(assignor: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(assignor)
    await this.prisma.assignor.create({ data })
  }

  async findById(id: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id },
    })
    if (!assignor) return null

    return PrismaAssignorMapper.toDomain(assignor)
  }

  async save(assignor: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(assignor)
    await this.prisma.assignor.update({
      where: { id: assignor.id },
      data,
    })
  }

  async delete(assignor: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(assignor)
    this.prisma.assignor.delete({
      where: { id: data.id },
    })
  }
}

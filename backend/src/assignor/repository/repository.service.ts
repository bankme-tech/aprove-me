import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Assignor, Prisma } from '@prisma/client';

@Injectable()
export class AssignorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return this.prisma.assignor.create({ data });
  }

  async findAll(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
  }

  async findOne(id: number): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.AssignorUpdateInput): Promise<Assignor> {
    return this.prisma.assignor.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Assignor> {
    return this.prisma.assignor.delete({ where: { id } });
  }
}

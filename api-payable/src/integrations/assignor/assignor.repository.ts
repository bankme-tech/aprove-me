import { Injectable } from '@nestjs/common';
import { Assignor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma.service';

@Injectable()
export class AssignorRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return this.prisma.assignor.create({ data });
  }

  async getById(id: string): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.AssignorUpdateInput,
  ): Promise<Assignor> {
    return this.prisma.assignor.update({ where: { id }, data });
  }

  async findMany() {
    return this.prisma.assignor.findMany();
  }

  async delete(id: string): Promise<Assignor> {
    return this.prisma.assignor.delete({ where: { id } });
  }
}

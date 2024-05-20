import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Payable, Prisma } from '@prisma/client';

@Injectable()
export class PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PayableCreateInput): Promise<Payable> {
    return this.prisma.payable.create({ data });
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany();
  }

  async findOne(id: string): Promise<Payable | null> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.PayableUpdateInput): Promise<Payable> {
    return this.prisma.payable.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Payable> {
    return this.prisma.payable.delete({ where: { id } });
  }
}

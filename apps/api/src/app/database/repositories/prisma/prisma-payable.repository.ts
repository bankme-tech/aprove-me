import { Injectable } from '@nestjs/common';
import { PayableRepository } from '../payable.repository';
import { Payable } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Payable> {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    return payable;
  }

  async findByAssignor(assignorId: string): Promise<Payable[]> {
    const payables = await this.prisma.payable.findMany({
      where: {
        assignorId,
      },
    });

    return payables;
  }

  async create(data: Payable): Promise<Payable> {
    const payable = await this.prisma.payable.create({
      data,
    });

    return payable;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { Payable } from '@prisma/client';

@Injectable()
export class PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async doesAssignorExist(assignorId: number): Promise<boolean> {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id: assignorId },
    });

    return !!assignor;
  }

  async create(data: CreatePayableDto): Promise<Payable> {
    const { assignorId, ...payableData } = data;

    return this.prisma.payable.create({
      data: {
        ...payableData,
        assignor: { connect: { id: assignorId } },
      },
    });
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany();
  }

  async findOne(id: string): Promise<Payable | null> {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdatePayableDto): Promise<Payable> {
    const { assignorId, ...payableData } = data;

    return this.prisma.payable.update({
      where: { id },
      data: {
        ...payableData,
        assignor: assignorId ? { connect: { id: assignorId } } : undefined,
      },
    });
  }

  async remove(id: string): Promise<Payable> {
    return this.prisma.payable.delete({
      where: { id },
    });
  }
}

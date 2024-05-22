import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';
import { Payable, Prisma } from '@prisma/client';
import { PayableDto } from './dtos/payables.dto';
import { PartialPayableDto } from './dtos/partial-payable.dto';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) { }

  async createPayable(dto: PayableDto): Promise<Payable> {
    return this.prisma.payable.create({
      data: {
        value: dto.value,
        emissionDate: dto.emissionDate,
        assignorId: dto.assignor,
      },
    });
  }

  async updatePayable(id: string, dto: PartialPayableDto): Promise<Payable> {
    return this.prisma.payable.update({
      where: { id },
      data: {
        value: dto.value,
        emissionDate: dto.emissionDate,
        assignorId: dto.assignor,
      },
    });
  }

  async getPayableById(id: string): Promise<Payable | null> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async deletePayable(id: string): Promise<Payable> {
    return this.prisma.payable.delete({ where: { id } });
  }
}


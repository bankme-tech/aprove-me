import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';
import { Payable } from '@prisma/client';
import { PayablesDto } from './dtos/payables.dto';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) { }

  async createPayable(dto: PayablesDto): Promise<Payable> {
    return this.prisma.payable.create({
      data: {
        value: dto.value,
        emissionDate: dto.emissionDate,
        assignorId: dto.assignor,
      },
    });
  }

  async updatePayable(id: string, dto: PayablesDto): Promise<Payable> {
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


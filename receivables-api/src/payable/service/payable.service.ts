import { Injectable } from '@nestjs/common';
import { PrismaClient, Payable } from '@prisma/client';
import { PayableEntity } from '../payable.entity';

@Injectable()
export class PayableService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPayable(payable: PayableEntity): Promise<Payable> {
    return this.prisma.payable.create({ data: payable });
  }

  async getPayableById(id: string): Promise<Payable | null> {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  async updatePayable(id: string, payable: PayableEntity): Promise<Payable> {
    return this.prisma.payable.update({ where: { id }, data: payable });
  }

  async deletePayable(id: string): Promise<Payable> {
    return this.prisma.payable.delete({ where: { id } });
  }
}

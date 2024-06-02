import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Payable from '../entity/Payable';

@Injectable()
export default class PayableRepository {
  constructor(private prismaService: PrismaService) {}

  async createPayableRegister(payable: Payable): Promise<Payable> {
    const payableRegister = await this.prismaService.payable.create({
      data: payable.toCreate(),
    });

    return new Payable(
      payableRegister.id,
      payableRegister.value,
      payableRegister.emissionDate,
      payableRegister.assignorId,
    );
  }

  async findPayableById(id: string): Promise<Payable | null> {
    const payable = await this.prismaService.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payable) {
      return null;
    }

    return new Payable(
      payable.id,
      payable.value,
      payable.emissionDate,
      payable.assignorId,
    );
  }

  async updatePayableById(
    id: string,
    payable: Payable,
  ): Promise<Payable | null> {
    const updatedPayable = await this.prismaService.payable.update({
      where: {
        id,
      },
      data: payable.toCreate(),
    });

    return new Payable(
      updatedPayable.id,
      updatedPayable.value,
      updatedPayable.emissionDate,
      updatedPayable.assignorId,
    );
  }

  async deletePayableById(id: string): Promise<void> {
    await this.prismaService.payable.delete({
      where: {
        id,
      },
    });
  }
}

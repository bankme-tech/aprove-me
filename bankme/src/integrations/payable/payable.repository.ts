import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Payable from '../entity/Payable';
import { IPayable } from '../types/IPayables';

@Injectable()
export default class PayableRepository {
  constructor(private prismaService: PrismaService) {}

  async createPayableRegister(payable: Payable): Promise<IPayable> {
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

  async findPayableById(id: string): Promise<IPayable | null> {
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
  ): Promise<IPayable | null> {
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

  async deletePayableById(id: string): Promise<IPayable | null> {
    const payable = await this.findPayableById(id);

    if (!payable) {
      return;
    }

    await this.prismaService.payable.delete({
      where: {
        id,
      },
    });

    return new Payable(
      payable.id,
      payable.value,
      payable.emissionDate,
      payable.assignorId,
    );
  }
}

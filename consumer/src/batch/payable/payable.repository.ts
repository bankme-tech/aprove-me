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
}

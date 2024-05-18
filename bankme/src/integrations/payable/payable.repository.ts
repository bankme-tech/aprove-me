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

    return payableRegister;
  }
}

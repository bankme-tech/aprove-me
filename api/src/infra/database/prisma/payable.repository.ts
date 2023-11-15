import { IPayable } from 'src/modules/payable/interfaces/payable.interface';
import { IPayableRepository } from 'src/modules/payable/interfaces/payable.repository.interface';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PayableRepository implements IPayableRepository {
  constructor(private prisma: PrismaService) {}

  create(payable: IPayable): Promise<IPayable> {
    return this.prisma.payable.create({ data: payable });
  }
}

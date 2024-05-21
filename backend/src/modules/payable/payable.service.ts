import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CrudStrategyService } from '../crud-strategy/crud-strategy.service';
import { AssignorService } from './../assignor/assignor.service';
import { PayableDto } from './dto/payable.dto';

@Injectable()
export class PayableService extends CrudStrategyService<
  Payable,
  Omit<PayableDto, 'id'>,
  Omit<PayableDto, 'id'>
> {
  refPrisma!: any;
  constructor(
    prisma: PrismaService, // Removendo a definição de 'prisma' daqui
    private readonly assignorService: AssignorService,
  ) {
    super(prisma, 'Payable');

    this.refPrisma = prisma;
  }

  async create(data: Omit<PayableDto, 'id'>): Promise<Payable> {
    await this.assignorService.findOne(data.assignorId);

    return await this.refPrisma.payable.create({
      data,
    });
  }
}

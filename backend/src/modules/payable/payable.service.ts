import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { CrudStrategyService } from '../crud-strategy/crud-strategy.service';
import { UserPayableService } from '../user-payable/user-payable.service';
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
    prisma: PrismaService,
    private readonly assignorService: AssignorService,
    private readonly userPayableService: UserPayableService,
  ) {
    super(prisma, 'Payable');

    this.refPrisma = prisma;
  }

  async create(
    data: Omit<PayableDto, 'id'>,
    user: JwtPayload,
  ): Promise<Payable> {
    await this.assignorService.findOne(data.assignorId);

    const payable = await this.refPrisma.payable.create({
      data,
    });
    console.log('🚀 ~ payable:', payable);
    console.log('🚀 ~ user:', user);

    await this.userPayableService.create({
      payableId: payable.id,
      userId: user.id,
    });

    return payable;
  }
}

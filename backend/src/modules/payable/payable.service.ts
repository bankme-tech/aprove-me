import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { Queue } from 'bull';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { CrudStrategyService } from '../crud-strategy/crud-strategy.service';
import { PayableDto } from './dto/payable.dto';

@Injectable()
export class PayableService extends CrudStrategyService<
  Payable,
  Omit<PayableDto, 'id'>,
  Omit<PayableDto, 'id'>
> {
  private result: Payable | null = null;

  constructor(
    @InjectQueue('payable') private queue: Queue,
    prisma: PrismaService,
  ) {
    super(prisma, 'Payable');
  }

  setResult(result: Payable): void {
    this.result = result;
  }

  getResult(): PayableDto | null {
    return this.result;
  }

  async create(
    data: Omit<PayableDto, 'id'>,
    user: JwtPayload,
  ): Promise<Payable> {
    const job = await this.queue.add('createPayable', {
      data,
      user,
    });
    console.log('🚀 ~ job:', job);

    await job.finished();

    return this.result;
  }
}

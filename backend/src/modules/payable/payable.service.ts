import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import Bull, { Queue } from 'bull';
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
  private result: Payable | null = null;
  private readonly refPrisma!: PrismaService;

  constructor(
    @InjectQueue('payable') private queue: Queue,
    private readonly assignorService: AssignorService,

    prisma: PrismaService,
  ) {
    super(prisma, 'Payable');
    this.refPrisma = prisma;
  }

  setResult(result: Payable): void {
    this.result = result;
  }

  getResult(): PayableDto | null {
    return this.result;
  }

  async create(data: Omit<PayableDto, 'id'>): Promise<Payable> {
    await this.assignorService.findOne(data.assignorId);

    const payable = await this.refPrisma.payable.create({
      data,
    });

    return payable;
  }

  async createMany(
    data: Omit<PayableDto, 'id'>[],
  ): Promise<Bull.Job<string | null>> {
    return this.queue.add('createPayable', {
      data,
    });
  }
}

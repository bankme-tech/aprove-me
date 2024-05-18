import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PayableRepository } from './payable-repository';

import { Payable } from '../entities/payable.entity';
import { CreatePayableDto } from '../dto/create-payable.dto';

@Injectable()
export default class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async create({ value, assignorId }: CreatePayableDto): Promise<Payable> {
    return await this.prisma.payable.create({
      data: {
        value,
        assignorId,
      },
    });
  }
}

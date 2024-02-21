import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import PayableRepository from './payableRepository';

import { Payable } from '../entities/payable.entity';
import { CreatePayableDto } from '../dto/create-payable.dto';

@Injectable()
export class PrismaPayableRepository extends PayableRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createPayableDto: CreatePayableDto): Promise<Payable> {
    const { value, assignorId } = createPayableDto;
    return await this.prisma.payable.create({
      data: {
        value,
        assignorId,
      },
    });
  }
}

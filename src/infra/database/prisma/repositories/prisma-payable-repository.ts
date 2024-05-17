import { Payable } from '@/app/entities/payable';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaPayableMapper } from '../mappers/payable';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private db: PrismaService) {}

  async create(payable: Payable): Promise<Payable> {
    const newPayable = await this.db.payable.create({
      data: {
        value: payable.value,
        emissionDate: payable.emissionDate,
        assingor: {
          connect: { id: payable.assignorId },
        },
      },
    });

    return PrismaPayableMapper.toDomain(newPayable);
  }
}

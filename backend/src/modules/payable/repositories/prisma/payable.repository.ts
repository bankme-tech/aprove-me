import { PayableEntity } from '../../entities/payable.entity';
import { IPayableRepository } from '../interfaces/payable.repository-interface';
import { PayableMapper } from '../../mappers/payable.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/prisma.service';

@Injectable()
export class PrismaPayableRepository implements IPayableRepository {
  constructor(private prisma: PrismaService) {}

  async create(payable: PayableEntity): Promise<void> {
    const entity = PayableMapper.toPersistence(payable);

    await this.prisma.payable.create({ data: entity });
  }

  async findById(id: string): Promise<PayableEntity | null> {
    const entity = await this.prisma.payable.findFirst({ where: { id } });

    if (!entity) return null;

    return PayableMapper.toDomain(entity);
  }
}

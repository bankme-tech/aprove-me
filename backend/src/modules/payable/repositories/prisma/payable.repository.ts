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

    await this.prisma.payable.create({
      data: {
        id: entity.id,
        emissionDate: entity.emissionDate,
        value: entity.value,
        assignorId: entity.assignorId,
      },
    });
  }

  async findById(id: string): Promise<PayableEntity | null> {
    const entity = await this.prisma.payable.findFirst({
      where: { id },
      include: { assignor: true },
    });

    if (!entity) return null;

    return PayableMapper.toDomain(entity);
  }

  async findAll(): Promise<PayableEntity[]> {
    const entities = await this.prisma.payable.findMany();

    return entities.map(PayableMapper.toDomain);
  }

  async update(payable: PayableEntity): Promise<void> {
    const entity = PayableMapper.toPersistence(payable);

    await this.prisma.payable.update({
      where: { id: payable.id },
      data: {
        id: entity.id,
        emissionDate: entity.emissionDate,
        value: entity.value,
        assignorId: entity.assignorId,
      },
    });
  }
}

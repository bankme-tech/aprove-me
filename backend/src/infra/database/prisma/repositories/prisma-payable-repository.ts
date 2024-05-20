import { Payable } from '@/app/entities/payable';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaPayableMapper } from '../mappers/payable';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private db: PrismaService) {}

  async findAll(skip: number, take: number): Promise<Payable[]> {
    const findPayables = await this.db.payable.findMany({
      where: { deletedAt: { equals: null } },
      skip,
      take,
    });

    return findPayables.map(PrismaPayableMapper.toDomain);
  }

  async count(): Promise<number> {
    const countPayables = await this.db.payable.count({
      where: { deletedAt: { equals: null } },
    });

    return countPayables;
  }

  async create(payable: Payable): Promise<Payable> {
    const newPayable = await this.db.payable.create({
      data: {
        value: payable.props.value,
        emissionDate: payable.props.emissionDate,
        assingor: {
          connect: { id: payable.props.assignorId },
        },
      },
    });

    return PrismaPayableMapper.toDomain(newPayable);
  }

  async findById(payableId: string): Promise<Payable> {
    const findPayable = await this.db.payable.findFirst({
      where: { id: payableId, deletedAt: null },
    });

    if (!findPayable) return null;

    return PrismaPayableMapper.toDomain(findPayable);
  }

  async edit(payable: Payable): Promise<Payable> {
    const updatePayable = await this.db.payable.update({
      where: { id: payable._id },
      data: { ...payable.props },
    });

    return PrismaPayableMapper.toDomain(updatePayable);
  }

  async delete(payableId: string): Promise<void> {
    await this.db.payable.update({
      where: { id: payableId },
      data: { deletedAt: new Date() },
    });
  }
}

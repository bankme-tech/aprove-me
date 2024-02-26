import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { PayableEntity } from './entities/payables.entity';
import { CreatePayableDataDTO } from './dtos/CreatePayableDTO';
import { FindAllPayableDataDTO } from './dtos/FindAllPayableDTO';
import { UpdatePayableDataDTO } from './dtos/UpdatePayableDTO';
import { FindOnePayableDataDTO } from './dtos/FindOnePayableDTO';
import { Prisma } from '@prisma/client';

@Injectable()
export class PayablesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    value,
    valueInCents,
    emissionDate,
    assignorId,
    userId,
  }: CreatePayableDataDTO): Promise<PayableEntity> {
    return this.prisma.payable.create({
      data: {
        value,
        valueInCents,
        emissionDate,
        assignorId,
        userId,
      },
    });
  }

  async findAll(
    data: FindAllPayableDataDTO,
  ): Promise<{ payables: PayableEntity[]; totalPages: number }> {
    const { emissionDate, assignorId, limit, offset } = data;

    const query: Prisma.PayableFindManyArgs = {
      where: {
        emissionDate,
        assignorId,
      },
      take: limit,
      skip: limit * offset,
    };

    const [payables, count] = await this.prisma.$transaction([
      this.prisma.payable.findMany(query),
      this.prisma.payable.count({ where: query.where }),
    ]);

    return {
      payables,
      totalPages: Math.ceil(Number(count) / limit),
    };
  }

  async findOne(data: FindOnePayableDataDTO): Promise<PayableEntity | null> {
    const { id } = data;
    return this.prisma.payable.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const payableExist = await this.prisma?.payable?.findFirst({
      where: {
        id,
      },
    });

    if (!payableExist) return;

    await this.prisma?.payable?.delete({
      where: {
        id,
      },
    });
  }

  async update(data: UpdatePayableDataDTO): Promise<PayableEntity> {
    const { id, value, valueInCents } = data;

    return this.prisma.payable.update({
      data: {
        value,
        valueInCents,
      },
      where: {
        id,
      },
    });
  }
}

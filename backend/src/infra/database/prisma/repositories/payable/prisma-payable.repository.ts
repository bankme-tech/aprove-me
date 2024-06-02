import { Injectable } from '@nestjs/common';
import { Payable } from '@core/payable/model';
import { PrismaService } from '@infra/database/prisma/services';
import { PayableRepository } from '@core/payable/ports/repository';
import { PrismPayableMapper } from '@infra/database/prisma/mappers/payable';

@Injectable()
export class PrismaPayableRepository implements PayableRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Payable> {
    const foundPayable = await this.prisma.payable.findUnique({
      where: { id },
    });

    if (!foundPayable) return null;

    return PrismPayableMapper.toDomain(foundPayable);
  }

  async save(payable: Payable): Promise<void> {
    await this.prisma.payable.create({
      data: {
        id: payable.id,
        value: payable.value,
        emissionDate: payable.emissionDate,
        assignor: payable.assignor,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({ where: { id } });
  }
}

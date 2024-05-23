import { PrismaClient } from '@prisma/client';

import { ReceivableEntity } from '../../domain/entity';
import { IReceivableRepository } from '../../domain/repository';

export class PrismaReceivableRepository implements IReceivableRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(entity: ReceivableEntity): Promise<void> {
    await this.prisma.receivable.create({
      data: {
        id: entity.id.value,
        assignorId: entity.assignorId.value,
        emissionDate: entity.emissionDate,
        value: entity.value,
      },
    });
  }

  async addMany(entities: ReceivableEntity[]): Promise<void> {
    await this.prisma.receivable.createMany({
      data: entities.map((item) => ({
        id: item.id.value,
        assignorId: item.assignorId.value,
        emissionDate: item.emissionDate,
        value: item.value,
      })),
    });
  }

  async findById(id: string): Promise<ReceivableEntity | null> {
    const receivable = await this.prisma.receivable.findUnique({
      where: { id },
      include: { assignor: true },
    });

    if (receivable) {
      const receivableWithAssignor = new ReceivableEntity({ ...receivable });
      receivableWithAssignor.addAssignor(receivable?.assignor);

      return receivableWithAssignor;
    }

    return null;
  }
}

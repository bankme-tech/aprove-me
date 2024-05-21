import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Payable } from '@/modules/integrations/domain/entities/payable.entity';
import { PayablesRepository } from '@/modules/integrations/domain/repositories/payables.repository';
import { PayablesMapper } from '../mappers/payables.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPayablesRepository implements PayablesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async save(payable: Payable): Promise<Payable> {
    const { id, ...raw } = PayablesMapper.toPersist(payable);

    const payableCreatedOrUpdated = await this.prisma.payable.upsert({
      where: { id: id ?? 'does not exists' },
      update: raw,
      create: { id, ...raw },
    });

    return PayablesMapper.toDomain(payableCreatedOrUpdated);
  }

  public async findById(id: string): Promise<Payable | null> {
    const payable = await this.prisma.payable.findFirst({
      where: {
        id,
      },
    });

    if (payable) {
      return PayablesMapper.toDomain(payable);
    }

    return null;
  }
}

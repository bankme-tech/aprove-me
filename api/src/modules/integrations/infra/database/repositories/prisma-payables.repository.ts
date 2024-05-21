import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Payable } from '@/modules/integrations/domain/entities/payable.entity';
import { PayablesRepository } from '@/modules/integrations/domain/repositories/payables.repository';
import { PayablesMapper } from '../mappers/payables.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPayablesRepository implements PayablesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async save(payable: Payable): Promise<Payable> {
    return PayablesMapper.toDomain(
      await this.prisma.payable.create({
        data: PayablesMapper.toPersist(payable),
      }),
    );
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

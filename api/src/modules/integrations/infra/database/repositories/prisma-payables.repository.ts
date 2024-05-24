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

  public async update(payable: Payable): Promise<Payable> {
    const { id, ...raw } = PayablesMapper.toPersist(payable);

    const updatedPayable = await this.prisma.payable.update({
      where: {
        id: id,
      },
      data: raw,
    });

    return PayablesMapper.toDomain(updatedPayable);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.payable.delete({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<Payable[]> {
    const payables = await this.prisma.payable.findMany();
    return payables.map(PayablesMapper.toDomain);
  }
}

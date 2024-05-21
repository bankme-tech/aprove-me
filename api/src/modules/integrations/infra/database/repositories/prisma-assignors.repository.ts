import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { Assignor } from '@/modules/integrations/domain/entities/assignor.entity';
import { AssignorsMapper } from '../mappers/assignors.mapper';
import { AssignorsRepository } from '@/modules/integrations/domain/repositories/assignors.repository';

@Injectable()
export class PrismaAssignorsRepository implements AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async save(assignor: Assignor): Promise<Assignor> {
    const { id, ...raw } = AssignorsMapper.toPersist(assignor);

    const payableCreatedOrUpdated = await this.prisma.assignor.upsert({
      where: { id: id ?? 'does not exists' },
      update: raw,
      create: { id, ...raw },
    });

    return AssignorsMapper.toDomain(payableCreatedOrUpdated);
  }

  public async findById(id: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findFirst({
      where: {
        id,
      },
    });

    if (assignor) {
      return AssignorsMapper.toDomain(assignor);
    }

    return null;
  }
}

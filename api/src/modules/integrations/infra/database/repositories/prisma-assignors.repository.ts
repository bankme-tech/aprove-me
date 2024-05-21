import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { Assignor } from '@/modules/integrations/domain/entities/assignor.entity';
import { AssignorMapper } from '../mappers/assignor.mapper';
import { AssignorsRepository } from '@/modules/integrations/domain/repositories/assignors.repository';

@Injectable()
export class PrismaAssignorsRepository implements AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async save(assignor: Assignor): Promise<Assignor> {
    return AssignorMapper.toDomain(
      await this.prisma.assignor.create({
        data: AssignorMapper.toPersist(assignor),
      }),
    );
  }

  public async findById(id: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findFirst({
      where: {
        id,
      },
    });

    if (assignor) {
      return AssignorMapper.toDomain(assignor);
    }

    return null;
  }
}

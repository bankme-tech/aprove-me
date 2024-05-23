import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { Assignor } from '@/modules/integrations/domain/entities/assignor.entity';
import { AssignorsMapper } from '../mappers/assignors.mapper';
import { AssignorsRepository } from '@/modules/integrations/domain/repositories/assignors.repository';

@Injectable()
export class PrismaAssignorsRepository implements AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async save(assignor: Assignor): Promise<Assignor> {
    return AssignorsMapper.toDomain(
      await this.prisma.assignor.create({
        data: AssignorsMapper.toPersist(assignor),
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
      return AssignorsMapper.toDomain(assignor);
    }

    return null;
  }

  public async update(assignor: Assignor): Promise<Assignor> {
    const { id, ...raw } = AssignorsMapper.toPersist(assignor);

    const updatedAssignor = await this.prisma.assignor.update({
      where: {
        id: id,
      },
      data: raw,
    });

    return AssignorsMapper.toDomain(updatedAssignor);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.assignor.delete({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findFirst({
      where: {
        email,
      },
    });

    if (assignor) {
      return AssignorsMapper.toDomain(assignor);
    }

    return null;
  }

  public async findAll(): Promise<Assignor[]> {
    const assignors = await this.prisma.assignor.findMany();

    return assignors.map(AssignorsMapper.toDomain);
  }
}

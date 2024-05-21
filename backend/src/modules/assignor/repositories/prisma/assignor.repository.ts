import type { AssignorEntity } from '../../entities/assignor.entity';
import { IAssignorRepository } from '../interfaces/assignor.repository-interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/prisma.service';
import { AssignorMapper } from '../../mappers/assignor.mapper';

@Injectable()
export class PrismaAssignorRepository implements IAssignorRepository {
  constructor(private prisma: PrismaService) {}

  async create(assignor: AssignorEntity): Promise<void> {
    const entity = AssignorMapper.toPersistence(assignor);

    await this.prisma.assignor.create({ data: entity });
  }

  async findById(id: string): Promise<AssignorEntity | null> {
    const entity = await this.prisma.assignor.findFirst({ where: { id } });

    if (!entity) return null;

    return AssignorMapper.toDomain(entity);
  }

  async findAll(): Promise<AssignorEntity[]> {
    const entities = await this.prisma.assignor.findMany();

    return entities.map(AssignorMapper.toDomain);
  }
}

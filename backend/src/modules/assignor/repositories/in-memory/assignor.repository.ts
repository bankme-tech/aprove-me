import type { AssignorPersistence } from '~/common/types/assignor.types';
import { AssignorEntity } from '../../entities/assignor.entity';
import { IAssignorRepository } from '../interfaces/assignor.repository-interface';
import { Injectable } from '@nestjs/common';
import { AssignorMapper } from '../../mappers/assignor.mapper';

@Injectable()
export class InMemoryAssignorRepository implements IAssignorRepository {
  items: AssignorPersistence[] = [];

  async create(assignor: AssignorEntity): Promise<void> {
    const entity = AssignorMapper.toPersistence(assignor);

    this.items.push(entity);
  }

  async findById(id: string): Promise<AssignorEntity | null> {
    const entity = this.items.find((item) => item.id === id);

    if (!entity) return null;

    return AssignorMapper.toDomain(entity);
  }

  async findAll(): Promise<AssignorEntity[]> {
    return this.items.map(AssignorMapper.toDomain);
  }

  async update(assignor: AssignorEntity): Promise<void> {
    const entityIndex = this.items.findIndex((item) => item.id);

    this.items[entityIndex] = AssignorMapper.toPersistence(assignor);
  }
}

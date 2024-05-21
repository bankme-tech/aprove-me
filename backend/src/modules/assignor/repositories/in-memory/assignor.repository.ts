import type { AssignorPersistence } from '~/common/types/assignor.types';
import type { AssignorEntity } from '../../entities/assignor.entity';
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
}

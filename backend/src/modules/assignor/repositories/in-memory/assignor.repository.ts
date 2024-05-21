import type { AssignorPersistence } from '~/common/types/assignor.types';
import type { AssignorEntity } from '../../entities/assignor.entity';
import { IAssignorRepository } from '../interfaces/assignor.repository-interface';
import { Injectable } from '@nestjs/common';
import { AssignorMapper } from '../../mappers/assignor.mapper';

@Injectable()
export class InMemoryAssignorRepository implements IAssignorRepository {
  items: AssignorPersistence[] = [];

  async create(assignor: AssignorEntity): Promise<AssignorPersistence> {
    const entity = AssignorMapper.toPersistence(assignor);

    this.items.push(entity);

    return entity;
  }
}

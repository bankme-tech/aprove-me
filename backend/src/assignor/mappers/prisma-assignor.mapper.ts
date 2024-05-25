import { UUID } from 'crypto';
import { IAssignorMapper } from './assignor.mapper.interface';
import { Assignor } from '@prisma/client';
import { AssignorEntity } from '../entities/assignor.entity';

export class PrismaAssignorMapper extends IAssignorMapper<Assignor> {
  toDomainEntity(data: Assignor): AssignorEntity {
    return {
      id: data.id as UUID,
      document: data.document,
      email: data.email,
      phone: data.phone,
      name: data.name,
    };
  }

  toPersistenceModel(data: AssignorEntity): Assignor {
    return {
      id: data.id as string,
      document: data.document,
      email: data.email,
      phone: data.phone,
      name: data.name,
    };
  }
}

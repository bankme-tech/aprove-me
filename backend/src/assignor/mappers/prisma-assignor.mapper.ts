import { UUID } from 'crypto';
import { IAssignorMapper } from './assignor.mapper.interface';
import { Assignor } from '@prisma/client';
import { AssignorEntity } from '../entities/assignor.entity';

export class PrismaAssignorMapper extends IAssignorMapper<Assignor> {
  toDomainEntity(data: Assignor): AssignorEntity {
    return new AssignorEntity(
      data.id as UUID,
      data.document,
      data.email,
      data.phone,
      data.name,
    );
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

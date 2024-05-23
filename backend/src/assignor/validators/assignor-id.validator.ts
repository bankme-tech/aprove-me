import { UUID } from 'crypto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IsUUID } from 'class-validator';

type IAssignorEntityId = Pick<AssignorEntity, 'id'>;

export class IdValidator implements IAssignorEntityId {
  @IsUUID('all', { message: 'Id must be a valid UUID' })
  id: UUID;
}

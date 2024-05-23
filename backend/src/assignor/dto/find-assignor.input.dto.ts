import { UUID } from 'crypto';
import { AssignorEntity } from '../entities/assignor.entity';
import { IsUUID } from 'class-validator';

type IFindAssignorDTO = Pick<AssignorEntity, 'id'>;

export class FindAssignorInputDTO implements IFindAssignorDTO {
  @IsUUID('all', { message: 'Id must be a valid UUID' })
  id: UUID;
}

import { UUID } from 'crypto';
import { IsUUID } from 'class-validator';
import { PayableEntity } from '../entities/payable.entity';

type IPayableEntityId = Pick<PayableEntity, 'id'>;

export class IdValidator implements IPayableEntityId {
  @IsUUID('all', { message: 'Id must be a valid UUID' })
  id: UUID;
}

import { randomUUID } from 'crypto';
import { AssignorEntity } from 'src/assignor/entities/assignor.entity';
import { makeAssignorDTO } from '../dtos.mock';

export const makeAssignorEntity = (): AssignorEntity => {
  const { document, email, phone, name } = makeAssignorDTO();
  return new AssignorEntity(randomUUID(), document, email, phone, name);
};

export const makeManyAssignorEntities = (): AssignorEntity[] => {
  return [makeAssignorEntity(), makeAssignorEntity(), makeAssignorEntity()];
};

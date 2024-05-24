import { randomUUID } from 'crypto';
import { PayableEntity } from 'src/payable/entities/payable.entity';
import { makePayableDTO } from '../dtos.mock';

export const makePayableEntity = (): PayableEntity => {
  const { value, emissionDate, assignorId } = makePayableDTO();
  return new PayableEntity(randomUUID(), value, emissionDate, assignorId);
};

export const makeManyPayableEntities = (): PayableEntity[] => {
  return [makePayableEntity(), makePayableEntity(), makePayableEntity()];
};

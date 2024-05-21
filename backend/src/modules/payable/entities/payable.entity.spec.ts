import { faker } from '@faker-js/faker';
import { PayableEntity } from './payable.entity';
import { InvalidEntityEntry } from '~/common/exceptions/invalid-entity-entry.exception';

describe('PayableEntity', () => {
  it('should create a payable entity', () => {
    const entity = PayableEntity.create({
      assignorId: faker.string.uuid(),
      emissionDate: faker.date.anytime(),
      value: faker.number.float(),
    });

    expect(entity.isRight()).toBeTruthy();
  });

  it('should not create a payable entity with invalid assignor id', () => {
    const entity = PayableEntity.create({
      assignorId: 'invalid-id',
      emissionDate: faker.date.anytime(),
      value: faker.number.float(),
    });

    expect(entity.isLeft()).toBeTruthy();
    expect(entity.value).toBeInstanceOf(InvalidEntityEntry);
    if (entity.isLeft())
      expect(entity.value.message).toEqual('AssignorId must be an uuid.');
  });
});

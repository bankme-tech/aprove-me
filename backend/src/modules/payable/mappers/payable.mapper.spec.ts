import { PayablePersistence } from '~/common/types/payable.types';
import { PayableMapper } from './payable.mapper';
import { faker } from '@faker-js/faker';
import { PayableEntity } from '../entities/payable.entity';

describe('PayableMapper', () => {
  it('should convert from persistente to domain', () => {
    const persistente: PayablePersistence = {
      id: faker.string.uuid(),
      assignorId: faker.string.uuid(),
      emissionDate: faker.date.anytime(),
      value: faker.number.float(),
    };

    const domain = PayableMapper.toDomain(persistente);

    expect(domain).toBeInstanceOf(PayableEntity);
    expect(domain).toEqual(expect.objectContaining(persistente));
  });

  it('should convert from domain to persistente', () => {
    const domain = PayableEntity.create({
      assignorId: faker.string.uuid(),
      emissionDate: faker.date.anytime(),
      value: faker.number.float(),
    });

    if (domain.isLeft()) throw domain.value;

    const persistente = PayableMapper.toPersistence(domain.value);

    expect(persistente.id).toEqual(domain.value.id);
    expect(persistente.assignorId).toEqual(domain.value.assignorId);
    expect(persistente.emissionDate).toEqual(domain.value.emissionDate);
    expect(persistente.value).toEqual(domain.value.value);
  });
});

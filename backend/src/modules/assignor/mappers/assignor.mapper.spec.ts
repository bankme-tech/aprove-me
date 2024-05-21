import { AssignorPersistence } from '~/common/types/assignor.types';
import { AssignorMapper } from './assignor.mapper';
import { faker } from '@faker-js/faker';
import { AssignorEntity } from '../entities/assignor.entity';

describe('AssignorMapper', () => {
  it('should convert from persistente to domain', () => {
    const persistente: AssignorPersistence = {
      id: faker.string.uuid(),
      document: faker.string.numeric(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: '+55 31 90000-0000',
    };

    const domain = AssignorMapper.toDomain(persistente);

    expect(domain).toBeInstanceOf(AssignorEntity);
    expect(domain).toEqual(expect.objectContaining(persistente));
  });

  it('should convert from domain to persistente', () => {
    const domain = AssignorEntity.create({
      document: faker.string.numeric(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: '+55 31 90000-0000',
    });

    if (domain.isLeft()) throw domain.value;

    const persistente = AssignorMapper.toPersistence(domain.value);

    expect(persistente.id).toEqual(domain.value.id);
    expect(persistente.name).toEqual(domain.value.name);
    expect(persistente.document).toEqual(domain.value.document);
    expect(persistente.email).toEqual(domain.value.email);
    expect(persistente.phone).toEqual(domain.value.phone);
  });
});

import { faker } from '@faker-js/faker';
import { AssignorEntity } from '../../entities/assignor.entity';

export function makeAssignor() {
  const assignorOrError = AssignorEntity.create({
    name: faker.person.fullName(),
    document: faker.string.numeric(),
    email: faker.internet.email(),
    phone: '+55 31 90000-0000',
  });

  if (assignorOrError.isLeft()) throw assignorOrError.value;

  return assignorOrError.value;
}

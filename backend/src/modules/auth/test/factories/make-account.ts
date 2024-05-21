import { faker } from '@faker-js/faker';
import { AccountEntity } from '../../entities/account.entity';

export function makeAccount() {
  const accountOrError = AccountEntity.create({
    login: faker.internet.userName(),
    password: faker.internet.password(),
  });

  if (accountOrError.isLeft()) throw accountOrError.value;

  return accountOrError.value;
}

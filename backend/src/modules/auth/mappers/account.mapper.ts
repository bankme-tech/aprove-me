import { AccountPersistence } from '~/common/types/account.types';
import { AccountEntity } from '../entities/account.entity';

export class AccountMapper {
  static toDomain(raw: AccountPersistence): AccountEntity {
    const entity = AccountEntity.create(
      {
        login: raw.login,
        password: raw.password,
      },
      raw.id,
    );

    if (entity.isLeft())
      throw new Error(`Can't transform "${raw.id}" account to domain layer.`);

    return entity.value;
  }

  static toPersistence(raw: AccountEntity): AccountPersistence {
    return {
      id: raw.id,
      login: raw.login,
      password: raw.password,
    };
  }
}

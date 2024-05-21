import { AccountPersistence } from '~/common/types/account.types';
import { AccountEntity } from '../../entities/account.entity';
import { IAccountRepository } from '../interfaces/account.repository-interface';
import { AccountMapper } from '../../mappers/account.mapper';

export class InMemoryAccountRepository implements IAccountRepository {
  items: AccountPersistence[] = [];

  async findByLogin(login: string): Promise<AccountEntity> {
    const entity = this.items.find((item) => item.login === login);

    if (!entity) return null;

    return AccountMapper.toDomain(entity);
  }
}

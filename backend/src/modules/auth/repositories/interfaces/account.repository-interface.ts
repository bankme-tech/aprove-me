import { AccountEntity } from '../../entities/account.entity';

export abstract class IAccountRepository {
  abstract findByLogin(login: string): Promise<AccountEntity | null>;
}

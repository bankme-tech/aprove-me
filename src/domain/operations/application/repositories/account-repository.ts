import { Account } from "src/domain/operations/enterprise/entities/accounts";

export abstract class AccountsRepository {
  abstract create(data: Account): Promise<void>
  abstract findById(id: string): Promise<Account | null>
  abstract findByLogin(login: string): Promise<Account | null>
}
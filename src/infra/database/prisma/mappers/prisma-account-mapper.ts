import { Prisma, User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Account } from 'src/domain/operations/enterprise/entities/accounts';

export abstract class PrismaAccountMapper {
  static toDomain(raw: PrismaUser): Account {
    return Account.create({
      login: raw.login,
      password: raw.password
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(raw: Account): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      login: raw.login,
      password: raw.password
    }
  }
}
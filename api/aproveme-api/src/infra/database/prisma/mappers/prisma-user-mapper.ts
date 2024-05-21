import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/account/enterprise/entities/user";
import { Prisma, User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        login: raw.login,
        password: raw.password,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      login: user.login,
      password: user.password,
    };
  }
}

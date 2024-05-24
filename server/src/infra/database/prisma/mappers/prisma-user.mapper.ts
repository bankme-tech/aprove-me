import { User } from '@modules/user/entities/user.entity';
import { Prisma, User as PrimaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      login: user.login,
      password: user.password,
    };
  }

  static toDomain(raw: PrimaUser | null): User | null {
    return User.create(
      {
        login: raw.login,
        password: raw.password,
      },
      raw.id,
    );
  }
}

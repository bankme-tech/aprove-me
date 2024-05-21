import { IUser } from '@domain/user/interfaces/user.interface';
import { User } from '@domain/user/models/user';
import { Password } from '@domain/user/value-objects/password';

import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
  static toPrisma(user: IUser): PrismaUser {
    return {
      id: user.id,
      username: user.username,
      password: user.password.value,
    };
  }

  static toDomain(input: PrismaUser): User {
    return User.fromData({
      id: input.id,
      username: input.username,
      password: Password.fromExisting({ value: input.password }),
    });
  }
}

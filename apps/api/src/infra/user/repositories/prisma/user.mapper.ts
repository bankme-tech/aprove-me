import { IUser } from '@domain/user/interfaces/user.interface';
import { User } from '@domain/user/models/user';
import { Password } from '@domain/user/value-objects/password';

import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
  static toPrisma(data: IUser): PrismaUser {
    return {
      id: data.id,
      username: data.username,
      password: data.password.value,
    };
  }

  static toDomain(data: PrismaUser): User {
    return User.fromData({
      id: data.id,
      username: data.username,
      password: Password.fromExisting({ value: data.password }),
    });
  }
}

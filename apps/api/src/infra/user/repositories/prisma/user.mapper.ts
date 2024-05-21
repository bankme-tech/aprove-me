import { IUser, Password, User } from '@bankme/domain';

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

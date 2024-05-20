import { User as rawUser } from '@prisma/client';
import { User } from '@/app/entities/user';

export class PrismaUserMappers {
  static toDomain(raw: rawUser): User {
    return new User(
      {
        login: raw.login,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }
}

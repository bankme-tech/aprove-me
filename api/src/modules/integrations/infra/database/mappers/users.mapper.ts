import { User as PrismaUser } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { User } from '@/modules/integrations/domain/entities/user.entity';

export class UsersMapper {
  public static toDomain(user: PrismaUser): User {
    return new User({
      id: user.id,
      login: user.login,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
  public static toPersist(user: User): Prisma.UserCreateInput {
    return {
      login: user.login,
      password: user.password,
    };
  }
}

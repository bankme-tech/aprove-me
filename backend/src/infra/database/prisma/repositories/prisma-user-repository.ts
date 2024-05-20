import { User } from '@/app/entities/user';
import { UserRepository } from '@/app/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaUserMappers } from '@/infra/database/prisma/mappers/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private db: PrismaService) {}

  public async create(user: User): Promise<User> {
    const newUser = await this.db.user.create({
      data: {
        login: user.props.login,
        password: user.props.password,
      },
    });

    return PrismaUserMappers.toDomain(newUser);
  }

  public async findByLogin(userLogin: string): Promise<User> {
    const findUser = await this.db.user.findFirst({
      where: { login: userLogin, deletedAt: null },
    });

    if (!findUser) return null;

    return PrismaUserMappers.toDomain(findUser);
  }
}

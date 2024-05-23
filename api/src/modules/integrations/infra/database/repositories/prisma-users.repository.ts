import { User } from '@/modules/integrations/domain/entities/user.entity';
import { UsersRepository } from '@/modules/integrations/domain/repositories/users.repository';
import { UsersMapper } from '../mappers/users.mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async save(user: User): Promise<User> {
    return UsersMapper.toDomain(
      await this.prisma.user.create({
        data: UsersMapper.toPersist(user),
      }),
    );
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      return UsersMapper.toDomain(user);
    }

    return null;
  }

  public async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    if (user) {
      return UsersMapper.toDomain(user);
    }

    return null;
  }
}

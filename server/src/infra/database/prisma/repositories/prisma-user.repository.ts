import { User } from '@modules/user/entities/user.entity';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(item: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(item);

    await this.prisma.user.create({
      data,
    });
  }

  async delete(itemId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: itemId },
    });
  }

  async save(item: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: item.id },
      data: {
        login: item.login,
        password: item.password,
      },
    });
  }

  async findById(itemId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: itemId },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { login },
    });

    return PrismaUserMapper.toDomain(user);
  }
}

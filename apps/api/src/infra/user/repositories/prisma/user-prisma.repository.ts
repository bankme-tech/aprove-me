import { Injectable } from '@nestjs/common';

import { IOption, toOption } from '@bankme/monads';

import { IUserConstructor, User } from '@domain/user/models/user';

import { IUserRepository } from '@infra/user/repositories/user.repository';
import { PrismaService } from '@infra/prisma/services/prisma.service';
import { UserMapper } from '@infra/user/repositories/prisma/user.mapper';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Omit<IUserConstructor, 'id'>): Promise<User> {
    const user = await this._prismaService.user.create({
      data: {
        username: data.username,
        password: data.password.value,
      },
    });
    return UserMapper.toDomain(user);
  }
  save(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async findOneByUsername(username: string): Promise<IOption<User>> {
    const user = await this._prismaService.user.findFirst({
      where: { username },
    });
    return toOption(user).map(UserMapper.toDomain);
  }
  async findOneById(id: string): Promise<IOption<User>> {
    const user = await this._prismaService.user.findFirst({
      where: { id },
    });
    return toOption(user).map(UserMapper.toDomain);
  }
  async delete(user: User): Promise<void> {
    await this._prismaService.user.delete({ where: { id: user.id } });
  }
}

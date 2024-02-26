import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const passwordBcrypt = bcrypt.hashSync(password, 8);
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordBcrypt,
      },
    });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(email: string, name: string): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      where: {
        email: {
          contains: email,
        },
        name: {
          contains: name,
        },
      },
    });
  }
  async findOne(id: number): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, name: string, email: string): Promise<UserEntity> {
    return this.prisma.user.update({
      data: {
        name,
        email,
      },
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos/create-user';
import { User } from 'src/domain/entities';
import { UserRepository } from 'src/repositories';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (!userExists) {
      return null;
    }

    return userExists;
  }
}

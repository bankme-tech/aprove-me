import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export default class PrismaUserRepository extends UserRepository {
  constructor(public readonly prisma: PrismaService) {
    super();
  }

  async findByLogin(login: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async create(data: CreateUserDto): Promise<User> {
    const { login, password } = data;

    return this.prisma.user.create({
      data: {
        login,
        password,
      },
    });
  }
}

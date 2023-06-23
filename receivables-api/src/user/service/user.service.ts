import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user: UserEntity): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
}

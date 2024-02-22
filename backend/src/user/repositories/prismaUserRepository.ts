import { User } from '@prisma/client';
import UserRepository from './userRepository';
import { PrismaService } from 'src/database/prisma.service';

export default class PrismaUserRepository extends UserRepository {
  constructor(public readonly prisma: PrismaService) {
    super();
  }

  findByLogin(login: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { login } });
  }
}

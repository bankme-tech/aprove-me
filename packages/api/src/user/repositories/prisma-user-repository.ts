import * as argon from 'argon2';
import { UserRepository } from './user-repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from '@database/prisma.service';

export default class PrismaUserRepository extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async create({ login, password }: CreateUserDto) {
    const hashedPassword = await argon.hash(password);

    return this.prisma.user.create({ data: { login, password: hashedPassword } });
  }
}

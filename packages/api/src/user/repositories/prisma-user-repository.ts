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

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
}

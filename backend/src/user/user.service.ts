import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { Encrypter } from 'src/shared/adapters';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('Encrypter')
    private encrypter: Encrypter,
    private prismaService: PrismaService,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const hashedPassword = await this.encrypter.hash(password);
    return this.prismaService.user.create({
      data: { login, password: hashedPassword },
    });
  }

  async findOne(login: string) {
    return this.prismaService.user.findUnique({
      where: {
        login,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { IUnsafeUser, IUser } from './interfaces/user.interface';
import { PrismaService } from 'src/infrastructure/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(user: IUnsafeUser) {
    return this.prisma.user.create({
      data: {
        login: user.login,
        password: user.password,
        salt: user.salt,
      },
    });
  }

  async exists(user: Pick<IUser, 'login'>): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: { login: user.login },
    });
    return !!existingUser;
  }

  async findOne(user: Pick<IUser, 'login'>): Promise<IUser> {
    return this.prisma.user.findUnique({ where: { login: user.login } });
  }

  async findOneWithUnsafeData(
    user: Pick<IUser, 'login'>,
  ): Promise<IUnsafeUser | null> {
    return this.prisma.user.findUnique({
      where: { login: user.login },
      select: { login: true, password: true, salt: true },
    });
  }
}

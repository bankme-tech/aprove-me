import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      login: 'aprovame',
      password: 'aprovame',
    },
  ];

  constructor(private prisma: PrismaService) {}

  async findByLogin(login: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        login,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}

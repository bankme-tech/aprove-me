import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(login: string) {
    return this.prismaService.user.findUnique({
      where: {
        login,
      },
    });
  }
}

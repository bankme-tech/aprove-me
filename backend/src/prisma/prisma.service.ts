import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.seed();
  }

  async seed() {
    const passwordWithHash = await hashPassword('aprovame');

    const userFound = await this.user.findUnique({
      where: {
        username: 'aprovame',
      },
    });

    if (userFound) return;

    await this.user.create({
      data: {
        username: 'aprovame',
        password: passwordWithHash,
        role: 'ADMIN',
      },
    });
  }
}

import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  async onApplicationShutdown(signal?: string) {
    await this.$disconnect();
    console.log(`Application shutdown with signal: ${signal}`);
  }

  async onModuleInit() {
    this.$connect();
  }
}

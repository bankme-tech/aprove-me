import { Module, Global } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => {
        const prisma = new PrismaClient();
        prisma.$connect();
        return prisma;
      },
    },
  ],
  exports: [PrismaClient],
})
export class DatabaseModule {}

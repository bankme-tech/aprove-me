import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@infra/prisma/services/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaInfraModule {}

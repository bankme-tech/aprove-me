import { Module } from '@nestjs/common';
import { ReceivableController } from 'src/controllers/receivable.controller';
import { PrismaService } from 'src/database/prisma.config';
import { PrismaReceivableRepository } from 'src/repositories/prisma/prisma.receivable.repository';
import { ReceivableRepository } from 'src/repositories/receivable.repository';

import { ReceivableService } from 'src/services/receivable.service';

@Module({
  imports: [],
  controllers: [ReceivableController],
  providers: [
    PrismaService,
    ReceivableService,
    {
      provide: ReceivableRepository,
      useClass: PrismaReceivableRepository,
    },
  ],
})
export class AssignorModule {}

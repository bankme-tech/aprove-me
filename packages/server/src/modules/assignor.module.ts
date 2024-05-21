import { Module } from '@nestjs/common';
import { ReceivableController } from 'src/controllers/receivable.controller';
import { PrismaReceivableRepository } from 'src/repositories/prisma/prisma.receivable.repository';
import { ReceivableRepository } from 'src/repositories/receivable.repository';

import { ReceivableService } from 'src/services/receivable.service';

@Module({
  imports: [PrismaReceivableRepository],
  controllers: [ReceivableController],
  providers: [
    ReceivableService,
    {
      provide: ReceivableRepository,
      useClass: PrismaReceivableRepository,
    },
  ],
})
export class AssignorModule {}

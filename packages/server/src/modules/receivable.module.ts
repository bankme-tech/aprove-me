import { Module } from '@nestjs/common';

import { AssignorController } from 'src/controllers/assignor.controller';
import { PrismaService } from 'src/database/prisma.config';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { PrismaAssignorRepository } from 'src/repositories/prisma/prisma.assignor.repository';
import { AssignorService } from 'src/services/assignor.service';

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [
    PrismaService,
    AssignorService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository,
    },
  ],
})
export class ReceivableModule {}

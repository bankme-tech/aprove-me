import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { IntegrationsController } from './integrations.controller';
import { AssignorRepository } from './repositories/assignor-repository';
import { PayableRepository } from './repositories/payable-repository';
import { PrismaAssignorRepository } from './repositories/prisma/prisma-assignor-repository';
import { PrismaPayableRepository } from './repositories/prisma/prisma-payable-repository';

@Module({
  imports: [],
  controllers: [IntegrationsController],
  providers: [PrismaService,
    {
      provide: AssignorRepository,
      useClass: PrismaAssignorRepository
    },
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository
    }],
})
export class AppModule { }

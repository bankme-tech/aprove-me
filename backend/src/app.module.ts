import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignorController } from './interfaces/http/controllers/assignor.controller';
import { PayableController } from './interfaces/http/controllers/payable.controller';
import { PayableService } from './domain/services/payable.service';
import { PrismaPayableRepository } from './infrastructure/repositories/prisma-payable.repository';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { PrismaAssignorRepository } from './infrastructure/repositories/prisma-assignor.repository';
import { AssignorService } from './domain/services/assignor.service';


@Module({
  imports: [PrismaModule],
  controllers: [AppController, AssignorController, PayableController],
  providers: [
    AppService,
    PayableService,
    AssignorService,
    {
      provide: 'PayableRepository',
      useClass: PrismaPayableRepository,
    },
    {
      provide: "AssignorRepository",
      useClass: PrismaAssignorRepository
    } 
  ],
})
export class AppModule {}

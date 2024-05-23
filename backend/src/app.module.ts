import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { PayableRepo } from './repositories/payable-repo';
import { prismaPayableRepo } from './repositories/prisma/prisma-payable-repo';
import { AssignorRepo } from './repositories/assignor-repo';
import { prismaAssignorRepo } from './repositories/prisma/prisma-assignor-repo';
import { UserRepo } from './repositories/user-repo';
import { prismaUserRepo } from './repositories/prisma/prisma-user-repo';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    { provide: PayableRepo, useClass: prismaPayableRepo },
    { provide: AssignorRepo, useClass: prismaAssignorRepo },
    { provide: UserRepo, useClass: prismaUserRepo },
  ],
})
export class AppModule {}

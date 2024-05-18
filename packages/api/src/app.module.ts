import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './database/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AssignorModule,
    PayableModule,
    DatabaseModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [
          { path: 'assignor', module: AssignorModule },
          { path: 'payable', module: PayableModule },
        ],
      },
    ]),
  ],
  providers: [PrismaService],
})
export class AppModule {}

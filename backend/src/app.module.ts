import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { HealthController } from './app.controller';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PayableModule,
    AssignorModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [
          {
            path: 'payable',
            module: PayableModule,
          },
          {
            path: 'assignor',
            module: AssignorModule,
          },
        ],
      },
    ]),
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}

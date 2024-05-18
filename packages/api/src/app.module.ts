import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AssignorModule,
    DatabaseModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [{ path: 'assignor', module: AssignorModule }],
      },
    ]),
  ],
  providers: [PrismaService],
})
export class AppModule {}

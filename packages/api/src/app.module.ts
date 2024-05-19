import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './database/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PayableModule,
    DatabaseModule,
    AssignorModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [
          { path: 'user', module: UserModule },
          { path: 'auth', module: AuthModule },
          { path: 'payable', module: PayableModule },
          { path: 'assignor', module: AssignorModule },
        ],
      },
    ]),
  ],
  providers: [PrismaService],
})
export class AppModule {}

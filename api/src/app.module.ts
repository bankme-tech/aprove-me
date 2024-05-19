import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from './services/prisma.service';
import { ReceivableService } from './services/receivable.service';
import { AssignorService } from './services/assignor.service';
import { PermissionsService } from './services/permissions.service';
import { ReceivableController } from './controllers/receivable.controller';
import { AssignorController } from './controllers/assignor.controller';
import { PermissionController } from './controllers/permission.controller'
import { AuthModule } from './auth/auth.module';
import { PayableConsumer } from './consumers/payable.consumer';

@Module({
  imports: [
    AuthModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      },
      defaultJobOptions: {
        // removeOnComplete: 100,
        // removeOnFail: 1000,
        attempts: 4,
        backoff: 1000
      },
    }),
    BullModule.registerQueue({
      name: 'payables',
    })
  ],
  controllers: [ReceivableController, AssignorController, PermissionController],
  providers: [PrismaService, ReceivableService, AssignorService, PermissionsService, PayableConsumer],
})
export class AppModule { }

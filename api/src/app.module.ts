import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ReceivableService } from './services/receivable.service';
import { AssignorService } from './services/assignor.service';
import { PermissionsService } from './services/permissions.service';
import { ReceivableController } from './controllers/receivable.controller';
import { AssignorController } from './controllers/assignor.controller';
import { PermissionController } from './controllers/permission.controller'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ReceivableController, AssignorController, PermissionController],
  providers: [PrismaService, ReceivableService, AssignorService, PermissionsService],
})
export class AppModule { }

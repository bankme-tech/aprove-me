import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UserAssignorService } from './user-assignor.service';

@Module({
  providers: [UserAssignorService, PrismaService],
  exports: [UserAssignorService],
})
export class UserAssignorModule {}

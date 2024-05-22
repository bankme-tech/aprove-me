import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UserPayableService } from './user-payable.service';

@Module({
  providers: [UserPayableService, PrismaService],
  exports: [UserPayableService],
})
export class UserPayableModule {}

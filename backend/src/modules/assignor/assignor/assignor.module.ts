import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorService } from './assignor.service';

@Module({
  providers: [AssignorService, PrismaService],
  exports: [AssignorService],
})
export class AssignorModule {}

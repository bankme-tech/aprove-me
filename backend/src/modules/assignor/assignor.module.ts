import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService],
  exports: [AssignorService],
})
export class AssignorModule {}

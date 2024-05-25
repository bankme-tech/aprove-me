import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AssignorController } from './assignor.controller';
import { AssignorServices } from './assignor.service';

@Module({
  controllers: [AssignorController],
  providers: [AssignorServices, PrismaService],
  exports: [AssignorServices],
})
export class AssignorModule {}

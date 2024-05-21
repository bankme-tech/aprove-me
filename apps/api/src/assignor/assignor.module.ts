import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssignorController } from './assignor.controller';

@Module({
  providers: [AssignorService, PrismaService],
  controllers: [AssignorController],
})
export class AssignorModule {}

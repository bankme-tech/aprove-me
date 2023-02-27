import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService],
})
export class AssignorModule {}

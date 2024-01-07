import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService],
})
export class AssignorModule {}

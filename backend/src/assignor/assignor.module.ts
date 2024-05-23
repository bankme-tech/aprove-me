import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService],
})
export class AssignorModule { }

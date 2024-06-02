import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaModule } from '../../prisma/prisma.module';
import AssignorRepository from './assignor.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository],
  exports: [AssignorService],
})
export class AssignorModule {}

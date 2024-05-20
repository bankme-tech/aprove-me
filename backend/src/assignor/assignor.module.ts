import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { AssignorRepository} from './repository/repository.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository, PrismaService],
  exports: [AssignorService],
})
export class AssignorModule {}

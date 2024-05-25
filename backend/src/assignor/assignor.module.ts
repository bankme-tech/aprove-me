import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService],
  imports: [PrismaModule],
})
export class AssignorModule {}

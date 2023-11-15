import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AssignorController],
  providers: [AssignorService],
})
export class AssignorModule {}

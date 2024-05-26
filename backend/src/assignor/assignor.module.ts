import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { AssignorRepository} from './repository/repository.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionModule } from 'src/auth/session/session-manager.module';

@Module({
  imports: [SessionModule],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository, PrismaService],
  exports: [AssignorService],
})
export class AssignorModule {}

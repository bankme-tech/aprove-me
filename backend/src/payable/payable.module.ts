import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './repository/repository.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionModule } from 'src/auth/session/session-manager.module';
// import { SessionManagerService } from 'src/auth/session-manager.service';

// the Session Manager Service should stay in a shared module?
@Module({
  imports: [SessionModule],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PrismaService],
})
export class PayableModule {}

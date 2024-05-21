import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './repository/repository.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionManagerService } from 'src/auth/session-manager.service';

// the Session Manager Service should stay in a shared module?
@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PrismaService, SessionManagerService],
})
export class PayableModule {}

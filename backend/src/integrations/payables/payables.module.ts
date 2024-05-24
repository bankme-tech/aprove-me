import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaService } from '../../prisma.service';
import { AuthGuard } from '../auth/auth.guard';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'payablesBatch' })],
  controllers: [PayablesController],
  providers: [
    PayablesService,
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class PayablesModule {}

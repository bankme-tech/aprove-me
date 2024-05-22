import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
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

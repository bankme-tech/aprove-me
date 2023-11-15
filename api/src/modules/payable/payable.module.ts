import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PayableService } from './payable.service';

@Module({
  imports: [PrismaModule],
  providers: [PayableService],
  controllers: [PayableController],
})
export class PayableModule {}

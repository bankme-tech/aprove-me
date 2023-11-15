import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PayableRepository } from './payable.repository';

@Module({
  providers: [PrismaService, PayableRepository],
  exports: [PayableRepository],
})
export class PrismaModule {}

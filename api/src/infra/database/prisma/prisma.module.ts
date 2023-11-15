import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PayableRepository } from './payable.repository';
import { AssignorRepository } from './assignor.repository';

@Module({
  providers: [PrismaService, PayableRepository, AssignorRepository],
  exports: [PayableRepository, AssignorRepository],
})
export class PrismaModule {}

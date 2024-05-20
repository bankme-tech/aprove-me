import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './repository/repository.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PrismaService],
})
export class PayableModule {}

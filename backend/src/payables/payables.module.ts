import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService, PrismaService]
})
export class PayablesModule { }

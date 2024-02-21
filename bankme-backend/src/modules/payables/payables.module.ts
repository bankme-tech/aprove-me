import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { PayablesService } from './payables.service';
import { PayablesRepository } from './payables.repository';
import { PayablesController } from './payables.controller';

@Module({
  controllers: [PayablesController],
  providers: [PrismaService, PayablesService, PayablesRepository],
  exports: [PayablesService],
})
export class PayablesModule {}
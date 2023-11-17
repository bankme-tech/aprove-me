import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PayableRepository } from './payable.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], 
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PrismaService],
})
export class PayableModule {}

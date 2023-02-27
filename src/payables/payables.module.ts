import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PayableController } from './payables.controller';
import { PayableService } from './payables.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}

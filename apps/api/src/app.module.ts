import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './prisma/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

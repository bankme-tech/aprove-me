import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './prisma/prisma.service';
import { AssignorModule } from './assignor/assignor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PayableModule, AssignorModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

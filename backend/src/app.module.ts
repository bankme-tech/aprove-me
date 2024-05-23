import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './persistence/prisma.module';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    PayableModule,
    AssignorModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './persistence/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    PayableModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

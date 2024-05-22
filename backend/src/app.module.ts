import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';
import { AuthModule } from './modules/auth/auth.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    AssignorModule,
    PayableModule,
    AuthModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  providers: [],
})
export class AppModule {}

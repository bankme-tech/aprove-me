import { Module } from '@nestjs/common';
import { PayablesModule } from './payables/payables.module';
import { UsersModule } from './users/users.module';
import { AssignorsModule } from './assignors/assignors.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    PayablesModule,
    UsersModule,
    AssignorsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

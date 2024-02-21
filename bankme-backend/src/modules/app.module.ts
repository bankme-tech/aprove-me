import { Module } from '@nestjs/common';
import { PayablesModule } from './payables/payables.module';
import { UsersModule } from './users/users.module';
import { AssignorsModule } from './assignors/assignors.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PayablesModule,
    UsersModule,
    AssignorsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

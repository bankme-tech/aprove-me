import { Module } from '@nestjs/common';
import { PayablesModule } from './payables/payables.module';
import { RouterModule } from '@nestjs/core';
import { AssignorsModule } from './assignors/assignors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PayablesModule,
    AssignorsModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'integrations',
        module: PayablesModule,
      },
      {
        path: 'integrations',
        module: AssignorsModule,
      },
      {
        path: 'integrations',
        module: AuthModule,
      },
    ]),
    UsersModule,
  ],
})
export class AppModule {}

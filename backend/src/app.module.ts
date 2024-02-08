import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PayableModule,
    AssignorModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [
          {
            path: 'auth',
            module: AuthModule
          },
          {
            path: 'assignor',
            module: AssignorModule
          },
          {
            path: 'payable',
            module: PayableModule
          },
        ]
      }
    ]),
    AuthModule,
    UserModule
  ],
})
export class AppModule { }

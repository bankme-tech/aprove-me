import { Module } from '@nestjs/common';
import { PayablesModule } from './payables/payables.module';
import { RouterModule } from '@nestjs/core';
import { AssignorsModule } from './assignors/assignors.module';

@Module({
  imports: [
    PayablesModule,
    AssignorsModule,
    RouterModule.register([
      {
        path: 'integrations',
        module: PayablesModule,
      },
      {
        path: 'integrations',
        module: AssignorsModule,
      },
    ]),
  ],
})
export class AppModule {}

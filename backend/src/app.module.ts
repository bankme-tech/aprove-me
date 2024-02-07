import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PayableModule,
    AssignorModule,
    RouterModule.register([
      {
        path: 'integrations',
        children: [
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
    ])
  ],
})
export class AppModule { }

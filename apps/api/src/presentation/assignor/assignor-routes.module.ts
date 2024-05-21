import { Module } from '@nestjs/common';

import { AssignorInfraModule } from '@infra/assignor/assignor-infra.module';

import { AssignorModule } from '@application/assignor/assignor.module';

import { AssignorController } from '@presentation/assignor/controllers/assignor.controller';

@Module({
  imports: [AssignorModule, AssignorInfraModule],
  controllers: [AssignorController],
})
export class AssignorRoutesModule {}

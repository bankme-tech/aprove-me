import { Module } from '@nestjs/common';
import { CrudStrategyController } from './crud-strategy.controller';
import { CrudStrategyService } from './crud-strategy.service';

@Module({
  controllers: [CrudStrategyController],
  providers: [CrudStrategyService],
})
export class CrudStrategyModule {}

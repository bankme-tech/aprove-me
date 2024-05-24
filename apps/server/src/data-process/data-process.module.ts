import { PayableRepository } from '@/payable/repository/payable.repository'
import { Module } from '@nestjs/common'
import { DataProcessConsumer } from './data-process.controller'

@Module({
  providers: [DataProcessConsumer, PayableRepository],
})
export class DataProcessModule {}

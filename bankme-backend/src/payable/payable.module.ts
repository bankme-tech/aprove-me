import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  imports: [DbModule],
  controllers: [PayableController],
  providers: [PayableService]
})
export class PayableModule {}

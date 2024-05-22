import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { AssignorService } from 'src/assignor/assignor.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [PayableController],
  providers: [PayableService, AssignorService]
    ,
})
export class PayableModule {}

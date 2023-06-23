import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PayableController } from './payable/controllers/payable.controller';
import { AssignorController } from './assignor/controllers/assignor.controller';
import { PayableService } from './payable/service/payable.service';
import { AssignorService } from './assignor/service/assignor.service';

@Module({
  imports: [],
  controllers: [PayableController, AssignorController],
  providers: [PrismaService, PayableService, AssignorService],
})
export class AppModule {}

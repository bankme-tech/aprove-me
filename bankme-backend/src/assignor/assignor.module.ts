import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

@Module({
  imports: [DbModule],
  controllers: [AssignorController],
  providers: [AssignorService]
})
export class AssignorModule {}

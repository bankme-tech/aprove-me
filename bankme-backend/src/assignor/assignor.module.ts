import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { AssignorRepository } from './assignor.repository';

@Module({
  imports: [DbModule],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository],
  exports: [AssignorService]
})
export class AssignorModule {}

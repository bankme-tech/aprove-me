import { Module } from '@nestjs/common';
import { AssignorController } from './controllers/assignor.controller';
import { CreateAssignorService } from '@modules/assignor/services/create-assignor.service';
import { DatabaseModule } from '@infra/database/database.module';
import { UpdateAssignorService } from '@modules/assignor/services/update-assignor.service';
import { ReadAssignorService } from '@modules/assignor/services/read-assignor.service';
import { DeleteAssignorService } from '@modules/assignor/services/delete-assignor.service';
import { ReadAllAssignorService } from '@modules/assignor/services/read-all-assignor.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AssignorController],
  providers: [
    CreateAssignorService,
    ReadAssignorService,
    ReadAllAssignorService,
    UpdateAssignorService,
    DeleteAssignorService,
  ],
})
export class HttpAssignorModule {}

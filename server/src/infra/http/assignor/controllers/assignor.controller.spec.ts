import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { CreateAssignorService } from '@modules/assignor/services/create-assignor.service';
import { ReadAssignorService } from '@modules/assignor/services/read-assignor.service';
import { UpdateAssignorService } from '@modules/assignor/services/update-assignor.service';
import { DeleteAssignorService } from '@modules/assignor/services/delete-assignor.service';

describe('AssignorController', () => {
  let controller: AssignorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        CreateAssignorService,
        ReadAssignorService,
        UpdateAssignorService,
        DeleteAssignorService,
      ],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

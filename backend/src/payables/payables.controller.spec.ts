import { Test, TestingModule } from '@nestjs/testing';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';

describe('PayablesController', () => {
  let controller: PayablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [PayablesService],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReceivableController } from './receivable.controller';
import { ReceivableService } from './receivable.service';

describe('ReceivableController', () => {
  let controller: ReceivableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivableController],
      providers: [ReceivableService],
    }).compile();

    controller = module.get<ReceivableController>(ReceivableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

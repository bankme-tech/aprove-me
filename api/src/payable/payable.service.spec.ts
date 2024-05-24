import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';

describe('PayableService', () => {
  let payableService: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService],
    }).compile();

    payableService = module.get<PayableService>(PayableService);
  });

  describe('findAll', () => {
    it('should return an array of payables', async () => {
      const result = await payableService.findAll();
      expect(result).toEqual([]);
    });
  });
});

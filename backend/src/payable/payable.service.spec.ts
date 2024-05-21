import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';

describe('PayableService', () => {
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

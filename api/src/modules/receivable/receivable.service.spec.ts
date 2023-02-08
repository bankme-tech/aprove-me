import { Test, TestingModule } from '@nestjs/testing';
import { ReceivableService } from './receivable.service';

describe('ReceivableService', () => {
  let service: ReceivableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivableService],
    }).compile();

    service = module.get<ReceivableService>(ReceivableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

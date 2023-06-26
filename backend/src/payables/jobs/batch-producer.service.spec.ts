import { Test, TestingModule } from '@nestjs/testing';
import { BatchProducerService } from './batch-producer.service';

describe('BatchProducerService', () => {
  let service: BatchProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchProducerService],
    }).compile();

    service = module.get<BatchProducerService>(BatchProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

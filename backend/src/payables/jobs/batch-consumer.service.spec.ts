import { Test, TestingModule } from '@nestjs/testing';
import { BatchConsumerService } from './batch-consumer.service';

describe('BatchConsumerService', () => {
  let service: BatchConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchConsumerService],
    }).compile();

    service = module.get<BatchConsumerService>(BatchConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

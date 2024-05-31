import { Test, TestingModule } from '@nestjs/testing';
import { PayableConsumerService } from './payable-consumer.service';

describe('PayableConsumerService', () => {
  let service: PayableConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableConsumerService],
    }).compile();

    service = module.get<PayableConsumerService>(PayableConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

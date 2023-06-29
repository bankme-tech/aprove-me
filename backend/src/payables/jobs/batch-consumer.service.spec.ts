import { Test, TestingModule } from '@nestjs/testing';
import { BatchConsumerService } from './batch-consumer.service';
import { PayablesService } from '../payables.service';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { PrismaService } from '../../prisma/prisma.service';

describe('BatchConsumerService', () => {
  let service: BatchConsumerService;
  let batchQueue = { 
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({name:'batchQueue'}),
      ],
      providers: [BatchConsumerService, PayablesService, PrismaService],
    }).overrideProvider(getQueueToken('batchQueue'))
    .useValue(batchQueue)
    .compile();
    

    service = module.get<BatchConsumerService>(BatchConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

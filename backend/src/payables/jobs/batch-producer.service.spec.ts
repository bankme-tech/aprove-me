import { Test, TestingModule } from '@nestjs/testing';
import { BatchProducerService } from './batch-producer.service';
import { PayablesService } from '../payables.service';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { PrismaService } from '../../prisma/prisma.service';

describe('BatchProducerService', () => {
  let service: BatchProducerService;
  let batchQueue= { 
    add: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({name:'batchQueue'}),
      ],
      providers: [BatchProducerService, PayablesService, PrismaService],
    }).overrideProvider(getQueueToken('batchQueue'))
    .useValue(batchQueue)
    .compile();

    service = module.get<BatchProducerService>(BatchProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

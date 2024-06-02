import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from '@infra/queue/services';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

describe('QueueService', () => {
  let queueService: QueueService;
  let deadLetterQueue: Queue;
  let processBatchPayableQueue: Queue;

  const payable = {
    assignor: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
    value: 100.5,
  };

  const payableWithAttempts = {
    ...payable,
    attemptsMade: 1,
    notifications: { error: ['Some error'] },
    error: new Error('Test Error'),
  };

  beforeEach(async () => {
    const QueueProcessBatchServiceProvider = {
      provide: getQueueToken('PROCESS_BATCH_PAYABLE'),
      useValue: {
        add: jest.fn().mockResolvedValue(undefined),
      },
    };

    const QueueDeadLetterServiceProvider = {
      provide: getQueueToken('DEAD_LETTER_QUEUE'),
      useValue: {
        add: jest.fn().mockResolvedValue(undefined),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        QueueDeadLetterServiceProvider,
        QueueProcessBatchServiceProvider,
      ],
    }).compile();

    queueService = module.get<QueueService>(QueueService);
    processBatchPayableQueue = module.get<Queue>(
      getQueueToken('PROCESS_BATCH_PAYABLE'),
    );
    deadLetterQueue = module.get<Queue>(getQueueToken('DEAD_LETTER_QUEUE'));
  });

  it('should be defined', () => {
    expect(queueService).toBeDefined();
    expect(deadLetterQueue).toBeDefined();
    expect(processBatchPayableQueue).toBeDefined();
  });

  describe('addProcessBatchPayableJob', () => {
    it('should add a job to the processBatchPayableQueue', async () => {
      await queueService.addProcessBatchPayableJob(payable);

      expect(processBatchPayableQueue.add).toHaveBeenCalledTimes(1);
      expect(processBatchPayableQueue.add).toHaveBeenCalledWith(payable);
    });
  });

  describe('addDeadLetterJob', () => {
    it('should add a job to the deadLetterQueue', async () => {
      await queueService.addDeadLetterJob(payableWithAttempts);

      expect(deadLetterQueue.add).toHaveBeenCalledTimes(1);
      expect(deadLetterQueue.add).toHaveBeenCalledWith(payableWithAttempts);
    });
  });
});

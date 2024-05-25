import { Test, TestingModule } from '@nestjs/testing';
import { BatchTrackerService } from './batch-tracker.service';

describe('BatchTrackerService', () => {
  let service: BatchTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchTrackerService],
    }).compile();

    service = module.get<BatchTrackerService>(BatchTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBatch', () => {
    it('should add a new batch with the specified total messages', () => {
      const batchId = 'batch-id';
      const totalMessages = 10;

      service.addBatch(batchId, totalMessages);

      expect(service['batches'][batchId]).toEqual({
        totalMessages,
        processedMessages: 0,
        sucessfulMessages: 0,
        failedMessages: 0,
        callback: null,
      });
    });
  });

  describe('messageProcessed', () => {
    it('should update the batch with a successful message', () => {
      const batchId = 'batch-id';
      service.addBatch(batchId, 2);

      service.messageProcessed(batchId, true);

      const batch = service['batches'][batchId];
      expect(batch.processedMessages).toBe(1);
      expect(batch.sucessfulMessages).toBe(1);
      expect(batch.failedMessages).toBe(0);
    });

    it('should update the batch with a failed message', () => {
      const batchId = 'batch-id';
      service.addBatch(batchId, 2);

      service.messageProcessed(batchId, false);

      const batch = service['batches'][batchId];
      expect(batch.processedMessages).toBe(1);
      expect(batch.sucessfulMessages).toBe(0);
      expect(batch.failedMessages).toBe(1);
    });

    it('should call the callback and delete the batch when all messages are processed', () => {
      const batchId = 'batch-id';
      const callback = jest.fn();

      service.addBatch(batchId, 1);
      service.onBatchComplete(batchId, callback);

      service.messageProcessed(batchId, true);

      expect(callback).toHaveBeenCalledWith({
        sucessfulMessages: 1,
        failedMessages: 0,
      });
      expect(service['batches'][batchId]).toBeUndefined();
    });
  });

  describe('onBatchComplete', () => {
    it('should set the callback for a batch', () => {
      const batchId = 'batch-id';
      const callback = jest.fn();

      service.addBatch(batchId, 1);
      service.onBatchComplete(batchId, callback);

      const batch = service['batches'][batchId];
      expect(batch.callback).toBe(callback);
    });

    it('should immediately call the callback if all messages are already processed', () => {
      const batchId = 'batch-id';
      const callback = jest.fn();

      service.addBatch(batchId, 1);
      service.messageProcessed(batchId, true);

      service.onBatchComplete(batchId, callback);

      expect(callback).toHaveBeenCalledWith({
        sucessfulMessages: 1,
        failedMessages: 0,
      });
    });
  });
});

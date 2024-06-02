import { Test, TestingModule } from '@nestjs/testing';
import {
  ProcessBatchPayableUseCase,
  RegisterPayableUseCase,
} from '@core/payable/usecases';
import { QueueService } from '@infra/queue/services';
import { ProcessSinglePayableInput } from '@core/payable/usecases/process-batch-payable/types';
import { Payable } from '@core/payable/model';
import { Job } from 'bull';
import { PayableDataBuilder } from '@core/test/__mocks__/data-builder';

describe('ProcessBatchPayableUseCase', () => {
  let sut: ProcessBatchPayableUseCase;
  let queueService: QueueService;
  let registerPayableUseCase: RegisterPayableUseCase;

  const input = PayableDataBuilder.aPayable().build();
  const payable = Payable.create(input);

  const invalidInput = PayableDataBuilder.aPayable().withValue(100).build();
  const invalidPayable = Payable.create(invalidInput);

  const payables = PayableDataBuilder.aPayable()
    .withMultiplePayables(3)
    .buildMultiple();

  const batchPayablesInput = PayableDataBuilder.aPayable()
    .withMultiplePayables(3)
    .buildBatchPayablesInput();

  beforeEach(async () => {
    jest.clearAllMocks();

    const QueueServiceProvider = {
      provide: QueueService,
      useValue: {
        addDeadLetterJob: jest.fn().mockResolvedValue(0),
        addProcessBatchPayableJob: jest.fn().mockResolvedValue(0),
      },
    };

    const RegisterPayableUseCaseProvider = {
      provide: RegisterPayableUseCase,
      useValue: {
        execute: jest.fn().mockResolvedValue(payable),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessBatchPayableUseCase,
        QueueServiceProvider,
        RegisterPayableUseCaseProvider,
      ],
    }).compile();

    sut = app.get<ProcessBatchPayableUseCase>(ProcessBatchPayableUseCase);
    queueService = app.get<QueueService>(QueueService);
    registerPayableUseCase = app.get<RegisterPayableUseCase>(
      RegisterPayableUseCase,
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(queueService).toBeDefined();
    expect(registerPayableUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call add process batch payable job with correct values', async () => {
      await sut.execute(batchPayablesInput);

      expect(queueService.addProcessBatchPayableJob).toHaveBeenCalledTimes(
        payables.length,
      );

      payables.forEach((payable, index) => {
        expect(queueService.addProcessBatchPayableJob).toHaveBeenNthCalledWith(
          index + 1,
          payable,
        );
      });
    });
  });

  describe('processSinglePayable', () => {
    it('should execute registerPayableUseCase and increment successCount if no notifications', async () => {
      const jobMock = {
        data: { ...input },
      } as Job<ProcessSinglePayableInput>;

      await sut['processSinglePayable'](jobMock);

      expect(registerPayableUseCase.execute).toHaveBeenCalledTimes(1);
      expect(registerPayableUseCase.execute).toHaveBeenCalledWith(jobMock.data);
      expect(sut['successCount']).toBe(1);
    });

    it('should handle errors and increment errorCount', async () => {
      const errorMock = {
        response: {
          error: {
            message:
              'This payable can only be created for an existing assignor',
            error: 'Not Found',
            statusCode: 404,
          },
        },
      };
      jest
        .spyOn(registerPayableUseCase, 'execute')
        .mockRejectedValueOnce(errorMock);

      const jobMock = {
        data: { ...input },
      } as Job<ProcessSinglePayableInput>;

      await sut['processSinglePayable'](jobMock);

      expect(queueService.addDeadLetterJob).toHaveBeenCalledWith({
        ...jobMock.data,
        error: errorMock.response,
      });
      expect(sut['errorCount']).toBe(1);
    });

    it('should increment attemptsMade if not defined and requeue the job', async () => {
      jest
        .spyOn(registerPayableUseCase, 'execute')
        .mockResolvedValueOnce(invalidPayable);

      const jobMock = {
        data: { ...invalidInput },
      } as Job<ProcessSinglePayableInput>;

      await sut['processSinglePayable'](jobMock);

      expect(jobMock.data.attemptsMade).toBe(1);
      expect(queueService.addProcessBatchPayableJob).toHaveBeenCalledWith(
        jobMock.data,
      );
    });

    it('should increment attemptsMade if defined and less than 4, then requeue the job', async () => {
      jest
        .spyOn(registerPayableUseCase, 'execute')
        .mockResolvedValueOnce(invalidPayable);

      const jobMock = {
        data: {
          ...invalidInput,
          attemptsMade: 2,
        },
      } as Job<ProcessSinglePayableInput>;

      await sut['processSinglePayable'](jobMock);

      expect(jobMock.data.attemptsMade).toBe(3);
      expect(queueService.addProcessBatchPayableJob).toHaveBeenCalledWith(
        jobMock.data,
      );
    });

    it('should manage payment attempts and add to dead letter queue if attempts exhausted', async () => {
      jest
        .spyOn(registerPayableUseCase, 'execute')
        .mockResolvedValueOnce(invalidPayable);

      const jobMock = {
        data: {
          ...invalidInput,
          attemptsMade: 4,
        },
      } as Job<ProcessSinglePayableInput>;

      await sut['processSinglePayable'](jobMock);

      expect(queueService.addDeadLetterJob).toHaveBeenCalledWith({
        ...jobMock.data,
        notifications: invalidPayable.notifications,
      });
      expect(sut['errorCount']).toBe(1);
    });
  });

  describe('onQueueCompleted', () => {
    it('should log batch processing details', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      sut['batchId'] = 'mockBatchId';
      sut['successCount'] = 5;
      sut['errorCount'] = 3;
      sut['totalJobs'] = 8;

      sut['onQueueCompleted']();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Lote mockBatchId processado: 5 sucesso(s) e 3 falha(s).',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'O processamento no lote mockBatchId: gerou 3 falhas',
      );
      consoleSpy.mockRestore();
    });
  });
});

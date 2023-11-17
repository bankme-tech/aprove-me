import { mock } from 'jest-mock-extended';
import { IPayableService } from '../../../modules/payable/interfaces/payable.service.interface';
import { PayableProcessor } from '../payable.processor';
import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from '../../../modules/payable/payable.service';
import { createPayableMock } from '../../../modules/payable/test/mock/create-payable.mock';
import { Logger } from '@nestjs/common';

describe('PayableProcessor', () => {
  let processor: PayableProcessor;
  const payableServiceMock = mock<IPayableService>();
  let loggerMock: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableProcessor,
        { provide: PayableService, useValue: payableServiceMock },
        Logger,
      ],
    }).compile();

    processor = module.get<PayableProcessor>(PayableProcessor);
    loggerMock = module.get<Logger>(Logger);
  });

  describe('handleQueueCompleted()', () => {
    it('should call PayableService with success and correct params', async () => {
      // ARRANGE
      const spiedLogger = jest.spyOn(loggerMock, 'log');
      payableServiceMock.create.mockResolvedValueOnce(createPayableMock);

      // ACT
      await processor.handleQueueCompleted({ data: [createPayableMock] });

      // ASSERT
      expect(payableServiceMock.create).toHaveBeenCalledWith(createPayableMock);
      expect(spiedLogger).toHaveBeenCalledWith(
        'Batch processed. Success: 1, Failures: 0',
      );
    });

    it('should count as failure and log on catch', async () => {
      // ARRANGE
      const spiedLogger = jest.spyOn(loggerMock, 'log');
      payableServiceMock.create.mockResolvedValueOnce(null);

      // ACT
      await processor.handleQueueCompleted({ data: ['any'] });

      // ASSERT
      expect(spiedLogger).toHaveBeenCalledWith(
        'Batch processed. Success: 0, Failures: 1',
      );
    });
  });
});

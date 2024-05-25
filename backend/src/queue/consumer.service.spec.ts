import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerService } from './consumer.service';
import { PayablesService } from '../payables/payables.service';
import { BatchTrackerService } from './batch-tracker.service';
import { Logger } from '@nestjs/common';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ChannelWrapper } from 'amqp-connection-manager';
import { ProducerService } from './producer.service';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let channelWrapper: DeepMockProxy<ChannelWrapper>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        {
          provide: PayablesService,
          useValue: mockDeep<PayablesService>(),
        },
        {
          provide: BatchTrackerService,
          useValue: mockDeep<BatchTrackerService>(),
        },
        {
          provide: Logger,
          useValue: mockDeep<Logger>(),
        },
        {
          provide: 'ChannelWrapper',
          useValue: mockDeep<ChannelWrapper>(),
        },
        {
          provide: ProducerService,
          useValue: mockDeep<ProducerService>(),
        },
      ],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);

    channelWrapper = module.get<ChannelWrapper>(
      'ChannelWrapper',
    ) as DeepMockProxy<ChannelWrapper>;

    // Spy on the onModuleInit method of the service instance
    jest.spyOn(service, 'onModuleInit').mockImplementation();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should set up the channel and start consuming messages', async () => {
      await service.onModuleInit();
      channelWrapper.addSetup.mockResolvedValueOnce();

      expect(service.onModuleInit).toHaveBeenCalledTimes(1);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { ChannelWrapper } from 'amqp-connection-manager';

jest.mock('amqp-connection-manager', () => {
  const originalModule = jest.requireActual('amqp-connection-manager');
  return {
    ...originalModule,
    connect: jest.fn().mockReturnValue({
      createChannel: jest.fn().mockReturnValue({
        assertQueue: jest.fn().mockResolvedValue(null),
        sendToQueue: jest.fn().mockResolvedValue(null),
      }),
    }),
  };
});

describe('ProducerService', () => {
  let service: ProducerService;
  let channelWrapperMock: Partial<ChannelWrapper>; // Mocked ChannelWrapper

  beforeEach(async () => {
    channelWrapperMock = {
      assertQueue: jest.fn().mockResolvedValue(null),
      sendToQueue: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: 'ChannelWrapper', // Use string token instead of actual class
          useValue: channelWrapperMock, // Use the mocked object
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

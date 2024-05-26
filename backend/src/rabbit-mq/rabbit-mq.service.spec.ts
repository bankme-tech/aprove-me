import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMqModule } from './rabbit-mq.module';
import { RabbitMqService } from './rabbit-mq.service';
import { PayableProcessor } from './consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PayableService } from '../payable/payable.service';
import { MailerService } from '../mailer/mailer.service';
import { MailerConfigModule } from '../mailer/mailer.module';

// Mock for ClientProxy
const mockClientProxy = {
  emit: jest.fn(),
};

// Mock for MailerService
const mockMailerService = {
  sendMail: jest.fn().mockResolvedValue(null),  // Ensure it resolves to avoid real email sending
};

// Mock for PayableService
const mockPayableService = {
  createOne: jest.fn(),
};

jest.mock('@nestjs-modules/mailer/dist/adapters/handlebars.adapter');

describe('RabbitMqModule', () => {
  let rabbitMqService: RabbitMqService;
  let payableProcessor: PayableProcessor;
  let mailService: MailerService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: "BANK_ME_PAYABLE_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URI || "amqp://localhost:5672"],
              queue: "payables_queue",
              queueOptions: {
                durable: true,
              },
            },
          }
        ]),
        RabbitMqModule,
        MailerConfigModule
      ],
      providers: [
        { provide: MailerService, useValue: mockMailerService },
        { provide: PayableService, useValue: mockPayableService }
      ],
    }).compile();

    rabbitMqService = module.get<RabbitMqService>(RabbitMqService);
    payableProcessor = module.get<PayableProcessor>(PayableProcessor);
    mailService = module.get<MailerService>(MailerService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('RabbitMqService should be defined', () => {
    expect(rabbitMqService).toBeDefined();
  });

  it('PayableProcessor should be defined', () => {
    expect(payableProcessor).toBeDefined();
  });

  it('MailerService should be defined', () => {
    expect(mailService).toBeDefined();
  });
});

describe('RabbitMqService', () => {
  let service: RabbitMqService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        RabbitMqService,
        {
          provide: 'BANK_ME_PAYABLE_SERVICE',
          useValue: mockClientProxy,
        },
      ],
      imports: [MailerConfigModule]
    }).compile();

    service = module.get<RabbitMqService>(RabbitMqService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add payable to queue', async () => {
    const payables = [
      { assignorId: '1', amount: 1000, description: 'Test payable 1', dueDate: new Date() }
    ];
    await service.addPayableToQueue(payables);
    expect(mockClientProxy.emit).toHaveBeenCalledWith('payables_queue', payables[0]);
  });
});

describe('PayableProcessor', () => {
  let processor: PayableProcessor;
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PayableProcessor,
        { provide: MailerService, useValue: mockMailerService },
        { provide: PayableService, useValue: mockPayableService }
      ],
      imports: [MailerConfigModule]
    }).compile();

    processor = module.get<PayableProcessor>(PayableProcessor);
  });

  afterEach(async () => {
    await module.close()
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });

  it('should process payable successfully', async () => {
    const payable = { assignorId: '1', amount: 1000, description: 'Test payable', dueDate: new Date() };
    const msg = { content: Buffer.from(JSON.stringify(payable)), properties: { headers: {} } };
    const channel = { ack: jest.fn(), nack: jest.fn(), sendToQueue: jest.fn() };

    mockPayableService.createOne.mockResolvedValueOnce(payable);

    await processor.handleProcessPayable(payable, msg, channel);

    expect(mockPayableService.createOne).toHaveBeenCalledWith(payable);
    expect(channel.ack).toHaveBeenCalledWith(msg);
  });

  it('should handle payable processing failure', async () => {
    const payable = { assignorId: '1', amount: 1000, description: 'Test payable', dueDate: new Date() };
    const msg = { content: Buffer.from(JSON.stringify(payable)), properties: { headers: {} } };
    const channel = { ack: jest.fn(), nack: jest.fn(), sendToQueue: jest.fn() };

    mockPayableService.createOne.mockRejectedValueOnce(new Error('Processing failed'));

    channel.ack.mockReturnValue(null);
    channel.nack.mockReturnValue(null);

    await processor.handleProcessPayable(payable, msg, channel);

    expect(channel.nack).toHaveBeenCalledWith(msg, false, false);
    expect(channel.sendToQueue).toHaveBeenCalledWith('payables_queue', Buffer.from(JSON.stringify(payable)), {
      headers: { 'x-retry-count': 1 }
    });
  });

  it('should send email on batch completion', async () => {
    await processor.handleBatchCompleted(10, 8, 2);
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to: 'client@example.com',
      subject: 'Batch Processing Completed',
      template: './batch-done',
      context: {
        total: 10,
        success: 8,
        failures: 2,
      },
    });
  });
});

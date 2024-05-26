import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from '../../src/payable/payable.service';
import { ICreatePayableUseCase } from '../../src/payable/usecases/create-payable.usecase.interface';
import { EmailService } from 'src/email/email.service';
import { makeBatchInputDTO } from 'test/mocks/dtos.mock';
import { faker } from '@faker-js/faker';
import { CustomLogger } from 'test/e2e/helpers/custom-logger.e2e';
import { CreatePayableInputDTO } from '../../src/payable/dto/create-payable.input.dto';
import { IProducer } from 'src/rabbitmq/interfaces/producer.interface';
import { BatchInputDTO } from 'src/payable/dto/batch.input.dto';

describe('PayableService', () => {
  let sut: PayableService;
  let createPayableSpy: ICreatePayableUseCase;
  let emailServiceSpy: EmailService;
  let producerSpy: IProducer<BatchInputDTO>;
  let dto: CreatePayableInputDTO[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: ICreatePayableUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
        {
          provide: IProducer,
          useValue: {
            publishMessage: jest.fn(),
          },
        },
      ],
    })
      .setLogger(new CustomLogger())
      .compile();

    sut = module.get<PayableService>(PayableService);
    createPayableSpy = module.get<ICreatePayableUseCase>(ICreatePayableUseCase);
    emailServiceSpy = module.get(EmailService);
    producerSpy = module.get(IProducer);

    dto = makeBatchInputDTO().payables;
  });

  describe('processBatch()', () => {
    test('should call createPayableUseCase with correct values', () => {
      const executeSpy = jest.spyOn(createPayableSpy, 'execute');

      sut.processBatch(dto);

      expect(executeSpy).toHaveBeenCalledTimes(dto.length);
    });

    test('should call producer.publishMessage with correct values if createPayableUseCase throws', async () => {
      jest
        .spyOn(createPayableSpy, 'execute')
        .mockRejectedValueOnce(new Error('Error creating payable'));

      const publishMessageSpy = jest.spyOn(producerSpy, 'publishMessage');
      const retries = faker.number.int({ min: 0, max: 4 });

      await sut.processBatch(dto, retries);

      expect(publishMessageSpy).toHaveBeenCalledWith(
        { payables: [dto[0]] },
        { retries: retries + 1 },
      );
    });

    test('should call emailService only for payables that were processed', async () => {
      const payables = makeBatchInputDTO({
        max: 1,
      }).payables;
      const mockPayables = [payables[0], payables[0], payables[0]];
      jest
        .spyOn(createPayableSpy, 'execute')
        .mockRejectedValueOnce(new Error('Error creating payable'))
        .mockResolvedValueOnce(mockPayables[1])
        .mockResolvedValueOnce(mockPayables[2]);
      const sendNotificationSpy = jest.spyOn(sut, 'sendNotificationEmail');

      await sut.processBatch(mockPayables);

      expect(sendNotificationSpy).toHaveBeenCalledWith(
        expect.arrayContaining([mockPayables[0], mockPayables[2]]),
      );
    });
  });

  describe('sendNotificationEmail()', () => {
    test('should call emailService.sendEmail with correct values if failed is false', async () => {
      const sendEmailSpy = jest.spyOn(emailServiceSpy, 'sendEmail');
      const partialContent = `Batch of ${dto.length} payables processed successfully`;

      await sut.sendNotificationEmail(dto);

      expect(sendEmailSpy).toHaveBeenCalledWith({
        to: process.env.EMAIL_TO_ON_SUCCESS,
        subject: 'Payables batch successfully processed',
        content: expect.stringContaining(partialContent),
      });
    });

    test('should call emailService.sendEmail with correct values if failed is true', async () => {
      const sendEmailSpy = jest.spyOn(emailServiceSpy, 'sendEmail');
      const partialContent = `An error occurred while processing payables batch.`;
      const failed = true;

      await sut.sendNotificationEmail(dto, failed);

      expect(sendEmailSpy).toHaveBeenCalledWith({
        to: process.env.EMAIL_TO_ON_ERROR,
        subject: 'Payables batch processing error',
        content: expect.stringContaining(partialContent),
      });
    });
  });
});

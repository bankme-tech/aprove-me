import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from '../../src/payable/payable.service';
import { ICreatePayableUseCase } from '../../src/payable/usecases/create-payable.usecase.interface';
import { EmailService } from 'src/email/email.service';
import { makeBatchInputDTO } from 'test/mocks/dtos.mock';
import { faker } from '@faker-js/faker';
import { CustomLogger } from 'test/e2e/helpers/custom-logger.e2e';
import { CreatePayableInputDTO } from '../../src/payable/dto/create-payable.input.dto';

describe('PayableService', () => {
  let sut: PayableService;
  let createPayableSpy: ICreatePayableUseCase;
  let emailServiceSpy: EmailService;
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
      ],
    })
      .setLogger(new CustomLogger())
      .compile();

    sut = module.get<PayableService>(PayableService);
    createPayableSpy = module.get<ICreatePayableUseCase>(ICreatePayableUseCase);
    emailServiceSpy = module.get(EmailService);

    dto = makeBatchInputDTO().payables;
  });

  test('should call createPayableUseCase with correct values', () => {
    const executeSpy = jest.spyOn(createPayableSpy, 'execute');

    sut.processBatch(dto);

    expect(executeSpy).toHaveBeenCalledTimes(dto.length);
  });

  test('should call emailService with correct values', async () => {
    const mockMultipleRejections = (
      obj: ICreatePayableUseCase,
      times: number,
    ): void => {
      for (let i = 0; i < times; i++) {
        jest
          .spyOn(obj, 'execute')
          .mockRejectedValueOnce(new Error('Error creating payable'));
      }
    };

    const { payables } = makeBatchInputDTO({ min: 5, max: 10 });
    const failedPayables = faker.number.int({
      min: 0,
      max: payables.length,
    });
    const processedPayables = Math.abs(failedPayables - payables.length);
    mockMultipleRejections(createPayableSpy, failedPayables);
    const sendEmailSpy = jest.spyOn(emailServiceSpy, 'sendEmail');
    const result = `Batch of ${payables.length} payables processed with ${processedPayables} successful payables and ${failedPayables} failed payables`;

    await sut.processBatch(payables);

    expect(sendEmailSpy).toHaveBeenCalledWith({
      to: process.env.EMAIL_TO,
      subject: 'Payables batch successfully processed',
      content: result,
    });
  });

  test("should throw error if there's an error processing the batch", async () => {
    const error = new Error('Error sending email');
    jest.spyOn(emailServiceSpy, 'sendEmail').mockRejectedValueOnce(error);

    const promise = sut.processBatch(dto);

    await expect(promise).rejects.toThrow(error);
  });
});

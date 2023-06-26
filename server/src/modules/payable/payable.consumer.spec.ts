import { Test, TestingModule } from '@nestjs/testing';
import { PayableConsumer } from './payable.consumer';
import { PayableService } from './payable.service';
import { AssignorService } from 'modules/assignor/assignor.service';
import { MailerService } from 'infra/mailer/mailer';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatePayableDto } from './dto/create-payable.dto';
import { emailTemplates } from 'infra/mailer/templates';

const makeFakePayable = () => ({
  id: 'any_id',
  assignorId: 'any_assignor_id',
  emissionDate: 'any_emission_date',
  valueInCents: 10000
})

const queueMock = { add: jest.fn() };

describe('PayableConsumer', () => {
  let sut: PayableConsumer;
  let payableService: PayableService;
  let assignorService: AssignorService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'dead-payable',
        }),
      ],
      providers: [
        PayableConsumer,
        {
          provide: PayableService,
          useValue: {
            create: jest.fn().mockResolvedValue(makeFakePayable()),
          }
        },
        {
          provide: AssignorService,
          useValue: {
            sendEmailToId: jest.fn()
          }
        },
        {
          provide: MailerService,
          useValue: {
            sendEmail: jest.fn()
          }
        }
      ],
    })
      .overrideProvider(getQueueToken('dead-payable'))
      .useValue(queueMock)
      .compile();

    sut = module.get<PayableConsumer>(PayableConsumer);
    payableService = module.get<PayableService>(PayableService);
    assignorService = module.get<AssignorService>(AssignorService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('batchCreate', () => {
    it('should call payableService.create with correct values', async () => {
      const createSpy = jest.spyOn(payableService, 'create')

      const jobMock = {
        id: 'mockJobId',
        data: [
          { ...makeFakePayable(), valueInCents: 100 },
          { ...makeFakePayable(), valueInCents: 200 },
          { ...makeFakePayable(), valueInCents: 300 },
        ]
      };

      // @ts-ignore
      await sut.batchCreate(jobMock)

      expect(createSpy).toHaveBeenCalledWith({ data: { ...makeFakePayable(), valueInCents: 100 } })
      expect(createSpy).toHaveBeenCalledWith({ data: { ...makeFakePayable(), valueInCents: 200 } })
      expect(createSpy).toHaveBeenCalledWith({ data: { ...makeFakePayable(), valueInCents: 300 } })
    });

    it('should call payableService.create 3 times if service throw', async () => {
      const createSpyRej = jest.spyOn(payableService, 'create').mockRejectedValueOnce(new Error())

      const jobMock = {
        id: 'mockJobId',
        data: [
          { ...makeFakePayable(), valueInCents: 200 },
        ]
      };

      // @ts-ignore
      await sut.batchCreate(jobMock)

      expect(createSpyRej).toHaveBeenCalledWith({ data: { ...makeFakePayable(), valueInCents: 200 } })
      expect(createSpyRej).toHaveBeenCalledWith({ data: { ...makeFakePayable(), valueInCents: 200 } })
      expect(createSpyRej).toHaveBeenCalledWith({ data: { ...makeFakePayable(), valueInCents: 200 } })
    });
  });

  describe('onCompleted', () => {
    it('should call deadQueue if exist failed items', async () => {

      const jobMock = {
        id: 'mockJobId',
        name: 'batch-create',
        data: [
          { ...makeFakePayable(), valueInCents: 200, job_failed: true },
          { ...makeFakePayable(), valueInCents: 200 },
        ]
      };

      // @ts-ignore
      await sut.onCompleted(jobMock)

      expect(queueMock.add).toHaveBeenCalledWith('batch-create-failed', [
        { ...makeFakePayable(), valueInCents: 200, job_failed: true },
      ]);
    })

    it('should call mailer if exist failed items', async () => {
      const sendEmailSpy = jest.spyOn(assignorService, 'sendEmailToId')

      const jobMock = {
        id: 'mockJobId',
        name: 'batch-create',
        data: [
          { ...makeFakePayable(), valueInCents: 200, job_failed: true },
          { ...makeFakePayable(), valueInCents: 200 },
        ]
      };

      // @ts-ignore
      await sut.onCompleted(jobMock)

      expect(sendEmailSpy).toHaveBeenCalledWith({
        id: makeFakePayable().assignorId,
        templateId: emailTemplates['suportEmail'],
        params: {}
      })
    })

    it('should call assignorService on success', async () => {
      const sendEmailSpy = jest.spyOn(assignorService, 'sendEmailToId')

      const jobMock = {
        id: 'mockJobId',
        name: 'batch-create',
        data: [
          { ...makeFakePayable(), valueInCents: 200, job_failed: true },
          { ...makeFakePayable(), valueInCents: 200 },
        ]
      };

      // @ts-ignore
      await sut.onCompleted(jobMock)

      expect(sendEmailSpy).toHaveBeenCalledWith({
        id: makeFakePayable().assignorId,
        templateId: emailTemplates['createPayableEmail'],
        params: {
          total_items: 2,
          created_items: 1,
          failed_items: 1
        }
      })
    })
  });
});

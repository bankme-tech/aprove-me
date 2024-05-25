import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

const mockNestMailerService = {
  sendMail: jest.fn(),
};

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: NestMailerService,
          useValue: mockNestMailerService,
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call sendMail with the correct options', async () => {
    const options = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    };

    await service.sendMail(options);

    expect(mockNestMailerService.sendMail).toHaveBeenCalledWith(options);
  });

  it('should handle exceptions thrown by the mailer service', async() => {
    const options = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    };
    mockNestMailerService.sendMail.mockRejectedValueOnce(new Error('Something wrong is not right'));

    await expect(service.sendMail(options)).rejects.toThrow('Something wrong is not right');
  });
});

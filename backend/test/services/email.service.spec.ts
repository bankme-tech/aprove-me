import { Test, TestingModule } from '@nestjs/testing';
import { EmailOptions, EmailService } from '../../src/email/email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { faker } from '@faker-js/faker';

jest.mock('@nestjs-modules/mailer');

describe('EmailService', () => {
  let sut: EmailService;
  let mailerServiceSpy: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailerServiceSpy = module.get(MailerService);

    sut = module.get<EmailService>(EmailService);
  });

  describe('sendEmail', () => {
    test('should call mailerService.sendMail', async () => {
      const emailOptions: EmailOptions = {
        to: faker.internet.email(),
        subject: faker.lorem.words(),
        content: faker.lorem.paragraph(),
      };

      await sut.sendEmail(emailOptions);

      expect(mailerServiceSpy.sendMail).toHaveBeenCalledWith({
        to: emailOptions.to,
        subject: emailOptions.subject,
        text: emailOptions.content,
      });
    });
  });
});

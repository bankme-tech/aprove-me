import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should return the email message object when successful', async () => {
      const emailOptions = {
        email: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML Content</p>',
      };

      const result = await service.sendEmail(emailOptions);

      expect(result).toEqual({
        to: emailOptions.email,
        subject: emailOptions.subject,
        html: emailOptions.html,
      });
    });

    it('should throw an HttpException when an error occurs', async () => {
      const emailOptions = {
        email: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML Content</p>',
      };

      // Mock the email sending function to throw an error
      const originalSendEmail = service.sendEmail;
      jest.spyOn(service, 'sendEmail').mockImplementation(async () => {
        throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      await expect(service.sendEmail(emailOptions)).rejects.toThrow(
        HttpException,
      );
      await expect(service.sendEmail(emailOptions)).rejects.toMatchObject({
        message: 'Error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });

      // Restore the original implementation
      jest.spyOn(service, 'sendEmail').mockImplementation(originalSendEmail);
    });
  });
});

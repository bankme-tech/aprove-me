import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { SendDto } from "./dto/send.dto";
import { EmailService } from "./email.service";

describe("EmailService", () => {
    let service: EmailService;
    let mailerService: MailerService;
    let configService: ConfigService;

    const mockMailerService = {
        sendMail: jest.fn().mockResolvedValue({})
    };

    const mockConfigService = {
        get: jest.fn().mockReturnValue("test@example.com")
    };

    const emailRequest: SendDto = {
        to: "recipient@example.com",
        subject: "Test Email",
        template: "<p>Hello {{ data.name }},</p>",
        data: { name: "John" }
    };
    const expectedResponse = {
        to: emailRequest.to,
        from: "test@example.com",
        subject: emailRequest.subject,
        html: expect.any(String)
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmailService,
                { provide: MailerService, useValue: mockMailerService },
                { provide: ConfigService, useValue: mockConfigService }
            ]
        }).compile();

        service = module.get<EmailService>(EmailService);
        mailerService = module.get<MailerService>(MailerService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("sendMail", () => {
        it("should send an email successfully", async () => {
            await service.sendMail(emailRequest);
            expect(mailerService.sendMail).toHaveBeenCalledWith(expectedResponse);
        });

        it("should throw an error if sendMail fails", async () => {
            const error = new Error("Mail sending failed");
            mockMailerService.sendMail.mockRejectedValue(error);

            await expect(service.sendMail(emailRequest)).rejects.toThrow(error);
        });
    });
});

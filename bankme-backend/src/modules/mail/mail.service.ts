import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

// INTERFACES
import { IMailService } from './interfaces/mail-service.interface';
import { ISendMailData } from './interfaces/send-mail-data.interface';

@Injectable()
export class MailService implements IMailService {
	private readonly logger: Logger = new Logger(MailService.name);

	constructor(private readonly mailService: MailerService) {}

	public async sendEmail({
		from,
		to,
		subject,
		content,
	}: ISendMailData): Promise<void> {
		this.logger.log(`SendEmail`);

		await this.mailService.sendMail({
			from,
			to,
			subject,
			text: content,
		});
	}
}

import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

// SERVICES
import { MailService } from './mail.service';

@Global()
@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}

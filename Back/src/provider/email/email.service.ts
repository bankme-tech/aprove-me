import { HandleHttpError } from "@/shared/utils/handleError";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Handlebars from "handlebars";
import { SendDto } from "./dto/send.dto";

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly from = this.configService.get("email.from");

    constructor(private mailerService: MailerService, private readonly configService: ConfigService) {}

    public async sendMail(request: SendDto): Promise<void> {
        try {
            this.logger.log(`Start service sendMail - Response - ${JSON.stringify({ request })}`);
            const html = this.createTemplate(request.template, request.data);
            this.mailerService.sendMail({
                to: request.to,
                from: this.from,
                subject: request.subject,
                html
            });
            this.logger.log("End service sendMail");
        } catch (error) {
            this.logger.error(`Error service sendMail - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }

    private createTemplate(template: any, data: object): any {
        try {
            this.logger.log("Start service createTemplate");
            const emailTemplate = Handlebars.compile(template, {});
            const emailBody = emailTemplate({
                data
            });
            this.logger.log("End service createTemplate");
            return emailBody;
        } catch (error) {
            this.logger.error(`Error service createTemplate - Error - ${JSON.stringify(error)}`);
            throw HandleHttpError.next(error);
        }
    }
}

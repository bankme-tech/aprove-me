import { Injectable } from "@nestjs/common";

import { MailService } from '@sendgrid/mail';
import { sleep } from "utils/sleep";
const sgMail = require('@sendgrid/mail');

interface SendEmailDto {
    to: string;
    from?: string;
    templateId: string;
    params: any;
}


@Injectable()
export class MailerService {

    private readonly sendGridMailInstance: MailService;

    constructor() {
        this.sendGridMailInstance = sgMail;
        this.sendGridMailInstance.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendEmail({ to, from, templateId, params }: SendEmailDto) {
        try {
            console.log(`[Mailer] Sending email to ${to}`)
            
            const defaultSender = 'thiagofialho39@gmail.com';
            return await this.sendGridMailInstance.send({
                to,
                from: from || defaultSender,
                templateId,
                dynamicTemplateData: {
                    ...params,
                },
            });            
        } catch (error) {
            await sleep(1000)
            console.log(`[fake-Mailer] Sending email to ${to}`)
        }
    }
}
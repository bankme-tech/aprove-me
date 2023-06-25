import { Injectable } from "@nestjs/common";
import { sleep } from "../../utils/sleep";

interface SendEmailDto {
    to: string;
}


@Injectable()
export class MailerService {
    async sendEmail ({ to }: SendEmailDto) {
        await sleep(3000) // forced delay to simulate sending of email
        console.log(`sending email to: ${to}`)
    }
}
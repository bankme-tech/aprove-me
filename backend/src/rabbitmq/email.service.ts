import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  static transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async deniedPayableEmail(payable: any) {
    await EmailService.transporter.sendMail({
      from: `"Payables Processor" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_OPERATIONTEAM,
      subject: 'Payable recused',
      text: `Payable ${payable.id} has been added to dead queue and it was not possible to process it. Check the dead queue for more information.`,
    });
  }

  async payablesInformationEmail(payablesResponse: {
    successPayloads: number;
    failedPayloads: number;
  }) {
    await EmailService.transporter.sendMail({
      from: `"Payables Processor" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_CLIENT,
      subject: 'Payable processed',
      text: `Payables were successfully processed.
      Success: ${payablesResponse.successPayloads}
      Failed: ${payablesResponse.failedPayloads}
      
      For more information, consult the Support Team.
      ${process.env.EMAIL_SUPPORTTEAM}
      `,
    });
  }
}

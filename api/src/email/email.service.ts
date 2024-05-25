import { Injectable, Logger } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { TransformPayableToEmail } from 'src/utils/transformPayableToEmail';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false to other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(
    payable: CreatePayableDto,
    assignor: Assignor,
    isSuccessful: boolean,
  ) {
    let mailOptions;
    if (isSuccessful) {
      mailOptions = TransformPayableToEmail.transformEmailToSuccess(
        payable,
        assignor,
      );
    } else {
      mailOptions = TransformPayableToEmail.transformEmailToFailure(
        payable,
        assignor,
      );
    }

    try {
      await this.transporter.sendMail(mailOptions);
      Logger.log(`Send email to ${mailOptions.to}`);
    } catch (error) {
      Logger.error(`Error sending email to ${mailOptions.to}`, error);
    }
  }
}

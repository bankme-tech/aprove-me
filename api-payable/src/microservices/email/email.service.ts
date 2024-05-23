import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from 'aws-sdk';
import { PayableBatchMessage } from "../rmq/payable-queue.service";

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) { }
  private readonly API_VERSION = '2010-12-01';
  private readonly REGION = 'us-east-1';
  private readonly EMAIL_SENDER = 'no-reply@ourcompany.com';

  private _ses: AWS.SES | undefined;
  private get ses(): AWS.SES {
    if (this._ses) return this._ses
    this._ses = new AWS.SES({
      apiVersion: this.API_VERSION,
      region: this.REGION,
    });
    return this._ses;
  }

  async sendAssignorEmailToAdmin(msg: PayableBatchMessage) {
    const teamEmails = this.configService
      // Expect comma separated emails
      .getOrThrow<string>('ADMIN_TEAM_EMAIL')
      .split(',');
    console.log(`[Log:teamEmails]:`, teamEmails);
    if (!Array.isArray(teamEmails)) {
      throw new InternalServerErrorException('ADMIN_TEAM_EMAIL split() error');
    }

    await this.ses.sendEmail({
      Source: this.EMAIL_SENDER,
      Destination: { ToAddresses: teamEmails },
      Message: {
        Subject: { Charset: "UTF-8", Data: 'Payable processing error.' },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h1>Error processing payable data</h1>
              <code>${JSON.stringify(msg, null, 2)}</code>`
          }
        },
      },
    }).promise();
  }
}

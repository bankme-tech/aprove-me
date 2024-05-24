import {
  Injectable,
  OnModuleInit,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { EmailService } from 'src/email/email.service';
import { CreatePayableDto } from 'src/payables/dto/create.payable.dto';
import { PayablesService } from 'src/payables/payables.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);
  constructor(
    @Inject(forwardRef(() => PayablesService))
    private payableService: PayablesService,

    private emailService: EmailService,
  ) {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('payableQueue', { durable: true });
        await channel.consume('payableQueue', async (message) => {
          if (message) {
            const content = JSON.parse(
              message.content.toString(),
            ) as CreatePayableDto[];

            const result =
              await this.payableService.processBatchCreatePayables(content);

            await this.emailService.sendEmail({
              email: `Os pagamentos foram processados, ${result.createSuccess} pagamentos foram processados com sucesso e ${result.createFailed} pagamentos falharam.`,
              html: `<p>Os pagamentos foram processados, ${result.createSuccess} pagamentos foram processados com sucesso e ${result.createFailed} pagamentos falharam.</p>`,
              subject: 'Pagamentos processados',
            });

            console.log('Received message:', result);

            channel.ack(message);
          }
        });
      });
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}

import {
  Injectable,
  OnModuleInit,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { PayablesService } from '../payables/payables.service';
import { BatchTrackerService } from './batch-tracker.service';
import { PayableQueueMessage } from './producer.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);
  constructor(
    @Inject(forwardRef(() => PayablesService))
    private payableService: PayablesService,

    private batchTracker: BatchTrackerService,
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
            ) as PayableQueueMessage;

            let processSuccess = false;

            try {
              await this.payableService.processBatchCreatePayable(
                content.payable,
              );
              processSuccess = true;
            } catch (error) {}

            this.batchTracker.messageProcessed(content.batchId, processSuccess);

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

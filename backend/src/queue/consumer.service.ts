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
import {
  PayableQueueMessage,
  QueueMessageStatus,
} from './entities/payable-queue-message.entity';
import { ProducerService } from './producer.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);
  constructor(
    @Inject(forwardRef(() => PayablesService))
    private payableService: PayablesService,
    private producerService: ProducerService,

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
            try {
              let content = JSON.parse(
                message.content.toString(),
              ) as PayableQueueMessage;

              content = plainToInstance(PayableQueueMessage, content);

              let processSuccess = false;

              try {
                await this.payableService.processBatchCreatePayable(
                  content.payable,
                );
                content.status = QueueMessageStatus.SUCCESS;
                processSuccess = true;
              } catch (error) {
                if (content.retryCount < 4) {
                  content.incrementRetryCount();
                  await this.producerService.addToPayableQueue(content);
                  channel.ack(message);

                  return;
                } else {
                  content.status = QueueMessageStatus.FAILED;
                  await this.producerService.addToDeadLetterQueue(content);
                }
              }

              this.batchTracker.messageProcessed(
                content.batchId,
                processSuccess,
              );

              channel.ack(message);
            } catch (error) {
              await this.producerService.addToDeadLetterQueue(
                message.content.toString(),
              );
              channel.nack(message);
            }
          }
        });
      });
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}

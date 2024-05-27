import { Inject, Injectable } from '@nestjs/common';
import {
  ClientOptions,
  ClientProviderOptions,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { RabbitmqConnection } from './connect-queues';
import { PayableBatchMessage } from './payable-queue.service';

/** Unique name for the connection */
export const PAYABLE_DEAD_LETTER_INJECT_TOKEN =
  'PAYABLE_DEAD_LEETER_INJECT_TOKEN ';
export const PAYABLE_DEAD_LETTER_QUEUE = 'dlq_payable_batch';
/** Controller unique `@MessagePattern(PATTERN_PAYABLE_BATCH)`. */
export const ROUTE_PAYABLE_BATCH_DEAD_LETTER = 'dlq-payable-batch';

@Injectable()
export class PayableDeadLetterQueueProvider {
  public constructor(
    @Inject(PAYABLE_DEAD_LETTER_INJECT_TOKEN)
    private readonly client: ClientProxy,
  ) {}

  /** Send payable to {@link PAYABLE_BATCH_QUEUE}. */
  async send(msg: PayableBatchMessage) {
    const sendDeadLetter$ = this.client.send(
      ROUTE_PAYABLE_BATCH_DEAD_LETTER,
      msg,
    );
    return sendDeadLetter$.toPromise();
  }
}

/** Get consumer that process data asynchronously. */
export function getPayableBatchDLQConsumer(
  conn: RabbitmqConnection,
): ClientOptions {
  const { username, password, host, port } = conn;
  return {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${username}:${password}@${host}:${port}/`],
      queue: PAYABLE_DEAD_LETTER_QUEUE,
      queueOptions: { durable: true },
    },
  };
}

/** Get producer that emit data asynchronously */
export function getPayableBatchDLQProducer(
  conn: RabbitmqConnection,
): ClientProviderOptions {
  const payableBatchConsumer = getPayableBatchDLQConsumer(conn);
  return {
    ...payableBatchConsumer,
    name: PAYABLE_DEAD_LETTER_INJECT_TOKEN,
  };
}

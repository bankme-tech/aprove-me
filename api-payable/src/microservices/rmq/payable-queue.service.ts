import { Inject, Injectable } from "@nestjs/common";
import {
  ClientOptions,
  ClientProviderOptions,
  ClientProxy,
  Transport,
} from "@nestjs/microservices";
import { RabbitmqConnection } from "./connect-queues";
import { PayableDto } from "src/integrations/payables/dtos/payables.dto";

/** Unique name for the connection */
export const PAYABLE_BATCH_INJECT_TOKEN = "PAYABLE_BATCH_INJECT_TOKEN";
export const PAYABLE_BATCH_QUEUE = "q_payable_batch";
/** Controller unique `@MessagePattern(patternPayableBatch)`. */
export const PATTERN_PAYABLE_BATCH = "payable-batch";

export interface PayableBatchMessage {
  // tryCount: number;
  data: PayableDto;
}

@Injectable()
export class PayableQueueProvider {
  public constructor(
    @Inject(PAYABLE_BATCH_INJECT_TOKEN) private readonly client: ClientProxy,
  ) { }

  // private readonly TRY_LIMIT = 4;

  /** Send payable to {@link PAYABLE_BATCH_QUEUE}. */
  async sendBatch(msg: PayableBatchMessage) {
    // TODO: if (event.tryCount === TRY_LIMIT) { // send to dead letter. }
    const sendBatch$ = this.client.send(PATTERN_PAYABLE_BATCH, msg);
    // TODO: @deprecated replace and test with `return firstValueFrom(send$);`
    return sendBatch$.toPromise();
  }
}

/** Get consumer that process data asynchronously. */
export function getPayableBatchConsumer(conn: RabbitmqConnection): ClientOptions {
  const { username, password, host, port } = conn;
  return {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${username}:${password}@${host}:${port}/`],
      queue: PAYABLE_BATCH_QUEUE,
      queueOptions: { durable: true },
    }
  };
}

/** Get producer that emit data asynchronously */
export function getPayableBatchProducer(conn: RabbitmqConnection): ClientProviderOptions {
  const payableBatchConsumer = getPayableBatchConsumer(conn);
  return {
    ...payableBatchConsumer,
    name: PAYABLE_BATCH_INJECT_TOKEN
  };
}

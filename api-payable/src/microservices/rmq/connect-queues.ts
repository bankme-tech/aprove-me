import { getPayableBatchConsumer } from "./payable-queue.service";
import { INestApplication } from "@nestjs/common";

export interface RabbitmqConnection {
  host: string;
  password: string;
  port: string;
  username: string;
  // vhost?: string;
}

export function connectQueues(
  app: INestApplication,
  rabbitmqConnection: RabbitmqConnection,
): void {
  const payableBatchConsumer = getPayableBatchConsumer(rabbitmqConnection);
  app.connectMicroservice(payableBatchConsumer);
};


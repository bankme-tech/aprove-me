import "dotenv/config";

import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export const consumerConfigInit = (app: INestApplication) => {
    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`${configService.get("rabbitmq.exchange")}`],
            queue: `${configService.get("rabbitmq.saveReceivableQueueName")}`,
            queueOptions: {
                durable: true,
                messageTtl: 1000
            },
            noAck: true,
            prefetchCount: 1,
            isGlobalPrefetchCount: true,
            maxConnectionAttempts: 1
        }
    });
};

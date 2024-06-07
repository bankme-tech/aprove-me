import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ReceivableProducerService } from "./receivable.producer.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: "SAVE_RECEIVABLE_QUEUE",
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => ({
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
                }),
                inject: [ConfigService]
            }
        ])
    ],
    providers: [ReceivableProducerService],
    exports: [ReceivableProducerService]
})
export class ReceivableProducerModule {}

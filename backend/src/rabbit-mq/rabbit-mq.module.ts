import { Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMqService } from "./rabbit-mq.service";
import { PayableProcessor } from "./consumer.service";
import { PayableModule } from "src/payable/payable.module";
import { MailerConfigModule } from "src/mailer/mailer.module";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "BANK_ME_PAYABLE_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI || "amqp://localhost:5672"],
          queue: "payables_queue",
          queueOptions: {
            durable: true,
          },
        },
      }
    ]),
    forwardRef(() => PayableModule), // I was not capable to solve this, so I used forwardRef to remove circular dependencies
    MailerConfigModule
  ],
  providers: [RabbitMqService, PayableProcessor],
  exports: [RabbitMqService, ClientsModule]
})
export class RabbitMqModule {}

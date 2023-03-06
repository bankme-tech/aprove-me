import { NestFactory } from '@nestjs/core';
import { PayableModule } from './payables.module';
import { RmqService } from '../rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(PayableModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PAYABLE'));
  await app.startAllMicroservices();
}
bootstrap();

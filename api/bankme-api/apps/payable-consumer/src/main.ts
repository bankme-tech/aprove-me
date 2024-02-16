import { NestFactory } from '@nestjs/core';
import { PayableConsumerModule } from './payable-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(PayableConsumerModule);
  await app.listen(3000);
}
bootstrap();

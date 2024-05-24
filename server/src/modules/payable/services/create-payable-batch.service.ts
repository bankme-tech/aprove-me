import { Injectable } from '@nestjs/common';
import { CreatePayableBatchDto } from '../../../infra/http/rabbitmq/dtos/create-payable-batch';
import { RabbitMQService } from '../../../infra/http/rabbitmq/rabbitmq.service';

@Injectable()
export class CreatePayableBatchService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async execute(createPayableBatchDto: CreatePayableBatchDto): Promise<void> {
    const { payables } = createPayableBatchDto;

    for (const payable of payables) {
      await this.rabbitMQService.sendToQueue('payables_queue', payable);
    }
  }
}

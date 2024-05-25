import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PayableBatchDto } from '../dto/payable-batch.dto';

@Controller('integrations')
export class PayableProducerController {
  constructor(@Inject('RABBIT_CLIENT') private client: ClientProxy) {}

  @Post('payable/batch')
  async batch(@Body() dto: PayableBatchDto) {
    const { payables } = dto;

    if (payables.length > 10000) {
      return 'Batch size exceeds the limit of 10,000 payables';
    }

    await firstValueFrom(this.client.emit('payable_queue', payables));

    return 'Batch processing initiated';
  }
}

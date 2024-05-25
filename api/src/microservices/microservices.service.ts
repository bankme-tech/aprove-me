import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from '../payable/dto/create-payable.dto';
import { PayableService } from '../payable/payable.service';

@Injectable()
export class MicroservicesService {
  constructor(private readonly payableService: PayableService) {}

  async handlePayableQueue(payablesToCreate: CreatePayableDto[]) {
    const maxRetries = 5;
    for (const payableToCreate of payablesToCreate) {
      let statusSuccess = false;
      let retries = 0;

      while (!statusSuccess && retries < maxRetries) {
        try {
          console.log('Creating payable:', payableToCreate);
          await this.payableService.create(payableToCreate);
          statusSuccess = true;
        } catch (error) {
          console.error(
            'Error registering accounts payable, trying again:',
            error,
          );
          retries++;
        }
      }

      if (!statusSuccess) {
        console.error(
          'Error creating payable after 5 retries:',
          payableToCreate,
        );
      }
    }
  }
}

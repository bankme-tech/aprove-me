import { Injectable } from '@nestjs/common';

@Injectable()
export class PayableService {
  processPayable(data: any) {
    console.log('Processing payable', data);
  }
}

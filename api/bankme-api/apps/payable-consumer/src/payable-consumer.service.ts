import { Injectable } from '@nestjs/common';

@Injectable()
export class PayableConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}

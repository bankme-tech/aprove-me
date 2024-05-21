import { Injectable } from '@nestjs/common';

@Injectable()
export class PayablesService {
  getHello(): string {
    return 'Hello World!';
  }
}

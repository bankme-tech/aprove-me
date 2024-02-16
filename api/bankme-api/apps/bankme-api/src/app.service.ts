import { Injectable } from '@nestjs/common';
import { Success } from 'bme/core/messages/success';

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    return Success.HELLO_WORLD;
  }
}

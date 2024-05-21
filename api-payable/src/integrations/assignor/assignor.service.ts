import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignorService {
  getHello(): string {
    return 'Hello World!';
  }
}

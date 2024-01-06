import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  version() {
    return {
      version: '0.1.0',
      date: '06/01/2024',
    };
  }
}

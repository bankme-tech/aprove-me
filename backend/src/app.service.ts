import { Injectable } from '@nestjs/common';
import { Public } from './users/decorators/public.decorator';

@Injectable()
export class AppService {
  @Public()
  getHello(): string {
    return 'Hello World!';
  }
}

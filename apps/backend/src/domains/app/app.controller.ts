import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  version() {
    return this.appService.version();
  }
}

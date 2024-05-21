import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('integrations')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  healthCheck(): { message: string } {
    return {
      message: 'Service is up and running',
    };
  }
}

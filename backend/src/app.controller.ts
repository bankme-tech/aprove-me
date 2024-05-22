import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health-check')
  healthCheck(): { message: string } {
    return {
      message: 'Service is up and running',
    };
  }
}

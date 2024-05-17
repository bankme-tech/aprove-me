import { Body, Controller, Post } from '@nestjs/common';
import { PayableDto } from './dto/payable.dto';

@Controller('integrations')
export class IntegrationsController {
    
  @Post('payable')
  payable(@Body() dto: PayableDto) {
    return dto;
  }
}

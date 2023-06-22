import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PayableDto } from '../dto/payable.dto';

@Controller('integrations')
export class PayableController {
  @Post('/payable')
  createPayable(@Body(ValidationPipe) payableDto: PayableDto): PayableDto {
    return payableDto;
  }
}

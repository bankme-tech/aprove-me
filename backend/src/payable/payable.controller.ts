import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { InputDisplayPayableDTO } from './dto/input-display-payable.dto';
import { OutputPayableDTO } from './dto/output-payable.dto';

@Controller('payable')
export class PayableController {
  @HttpCode(200)
  @Post()
  display(@Body() inputDTO: InputDisplayPayableDTO): OutputPayableDTO {
    const { payable, assignor } = inputDTO;
    return {
      payable: {
        id: payable.id,
        value: payable.value,
        emissionDate: payable.emissionDate,
        assignor: payable.assignor,
      },
      assignor: {
        id: assignor.id,
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
    };
  }
}

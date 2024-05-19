import { Body, Controller, Post } from '@nestjs/common';
import { BASE_PAYABLE_PATH } from './constants/paths';
import { CreatePayableWithAssignorDto } from './dtos/create-payable-with-assignor.dto';

@Controller(BASE_PAYABLE_PATH)
export class PayableController {
  @Post()
  public createPayableWithAssignor(
    @Body() createPayableWithAssignorDto: CreatePayableWithAssignorDto,
  ): CreatePayableWithAssignorDto {
    return createPayableWithAssignorDto;
  }
}

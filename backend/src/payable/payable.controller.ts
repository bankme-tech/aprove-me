import { Controller, Post, Body } from '@nestjs/common';
import { CreatePayableInputDTO } from './dto/create-payable.input.dto';
import { CreatePayableOutputDTO } from './dto/create-payable.output.dto';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';

@Controller('payable')
export class PayableController {
  constructor(private readonly createPayableUseCase: ICreatePayableUseCase) {}

  @Post()
  async create(
    @Body() createPayableDTO: CreatePayableInputDTO,
  ): Promise<CreatePayableOutputDTO> {
    return await this.createPayableUseCase.execute(createPayableDTO);
  }
}

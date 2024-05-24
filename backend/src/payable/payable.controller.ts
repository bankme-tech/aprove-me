import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreatePayableInputDTO } from './dto/create-payable.input.dto';
import { CreatePayableOutputDTO } from './dto/create-payable.output.dto';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { FindPayableOutputDTO } from './dto/find-payable.output.dto';
import { IFindAllPayablesUseCase } from './usecases/find-all-payables.usecase.interface';
import { FindPayableInputDTO } from './dto/find-payable.input.dto';
import { IFindPayableUseCase } from './usecases/find-payable.usecase.interface';

@Controller('payable')
export class PayableController {
  constructor(
    private readonly createPayableUseCase: ICreatePayableUseCase,
    private readonly findAllPayablesUseCase: IFindAllPayablesUseCase,
    private readonly findPayableUseCase: IFindPayableUseCase,
  ) {}

  @Post()
  async create(
    @Body() createPayableDTO: CreatePayableInputDTO,
  ): Promise<CreatePayableOutputDTO> {
    return await this.createPayableUseCase.execute(createPayableDTO);
  }

  @Get()
  async findAll(): Promise<FindPayableOutputDTO[]> {
    return await this.findAllPayablesUseCase.execute();
  }

  @Get(':id')
  async findOne(
    @Param() findPayableDTO: FindPayableInputDTO,
  ): Promise<FindPayableOutputDTO> {
    return await this.findPayableUseCase.execute(findPayableDTO);
  }
}

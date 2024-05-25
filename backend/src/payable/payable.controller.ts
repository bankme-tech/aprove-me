import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreatePayableInputDTO } from './dto/create-payable.input.dto';
import { CreatePayableOutputDTO } from './dto/create-payable.output.dto';
import { ICreatePayableUseCase } from './usecases/create-payable.usecase.interface';
import { FindPayableOutputDTO } from './dto/find-payable.output.dto';
import { IFindAllPayablesUseCase } from './usecases/find-all-payables.usecase.interface';
import { FindPayableInputDTO } from './dto/find-payable.input.dto';
import { IFindPayableUseCase } from './usecases/find-payable.usecase.interface';
import {
  UpdatePayableInputBodyDTO,
  UpdatePayableInputParamsDTO,
} from './dto/update-payable.input.dto';
import { IUpdatePayableUseCase } from './usecases/update-payable.usecase.interface';
import { RemovePayableInputDTO } from './dto/remove-payable.input.dto';
import { IRemovePayableUseCase } from './usecases/remove-payable.usecase.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('payable')
export class PayableController {
  constructor(
    private readonly createPayableUseCase: ICreatePayableUseCase,
    private readonly findAllPayablesUseCase: IFindAllPayablesUseCase,
    private readonly findPayableUseCase: IFindPayableUseCase,
    private readonly updatePayableUseCase: IUpdatePayableUseCase,
    private readonly removePayableUseCase: IRemovePayableUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPayableDTO: CreatePayableInputDTO,
  ): Promise<CreatePayableOutputDTO> {
    return await this.createPayableUseCase.execute(createPayableDTO);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<FindPayableOutputDTO[]> {
    return await this.findAllPayablesUseCase.execute();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param() findPayableDTO: FindPayableInputDTO,
  ): Promise<FindPayableOutputDTO> {
    return await this.findPayableUseCase.execute(findPayableDTO);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param() updatePayableInputParamsDTO: UpdatePayableInputParamsDTO,
    @Body() updatePayableInputBodyDTO: UpdatePayableInputBodyDTO,
  ): Promise<FindPayableOutputDTO> {
    return await this.updatePayableUseCase.execute({
      id: updatePayableInputParamsDTO.id,
      ...updatePayableInputBodyDTO,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param() removePayableInputDTO: RemovePayableInputDTO,
  ): Promise<void> {
    return await this.removePayableUseCase.execute(removePayableInputDTO);
  }
}

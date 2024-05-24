import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAssignorInputDTO } from './dto/create-assignor.input.dto';
import { ICreateAssignorUseCase } from './usecases/create-assignor.usecase.interface';
import { CreateAssignorOutputDTO } from './dto/create-assignor.ouput.dto';
import { IFindAllAssignorsUseCase } from './usecases/find-all-assignors.usecase.interface';
import { FindAssignorOutputDTO } from './dto/find-assignor.output.dto';
import { IFindAssignorUseCase } from './usecases/find-assignor.usecase.interface';
import { FindAssignorInputDTO } from './dto/find-assignor.input.dto';
import { UpdateAssignorOutputDTO } from './dto/update-assignor.output.dto';
import { IUpdateAssignorUseCase } from './usecases/update-assignor.usecase.interface';
import {
  UpdateAssignorInputBodyDTO,
  UpdateAssignorInputParamsDTO,
} from './dto/update-assignor.input.dto';
import { IRemoveAssignorUseCase } from './usecases/remove-assignor.usecase.interface';
import { RemoveAssignorInputDTO } from './dto/remove-assignor.input.dto';

@Controller('assignor')
export class AssignorController {
  constructor(
    private readonly createAssignorUseCase: ICreateAssignorUseCase,
    private readonly findAllAssignorsUseCase: IFindAllAssignorsUseCase,
    private readonly findAssignorUseCase: IFindAssignorUseCase,
    private readonly updateAssignorUseCase: IUpdateAssignorUseCase,
    private readonly removeAssignorUseCase: IRemoveAssignorUseCase,
  ) {}

  @Post()
  async create(
    @Body() createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<CreateAssignorOutputDTO> {
    return await this.createAssignorUseCase.execute(createAssignorDTO);
  }

  @Get()
  async findAll(): Promise<FindAssignorOutputDTO[]> {
    return await this.findAllAssignorsUseCase.execute();
  }

  @Get(':id')
  async findOne(
    @Param() findAssignorDTO: FindAssignorInputDTO,
  ): Promise<FindAssignorOutputDTO> {
    return await this.findAssignorUseCase.execute(findAssignorDTO);
  }

  @Patch(':id')
  async update(
    @Param() updateAssignorInputParamsDTO: UpdateAssignorInputParamsDTO,
    @Body() updateAssignorDTO: UpdateAssignorInputBodyDTO,
  ): Promise<UpdateAssignorOutputDTO> {
    return await this.updateAssignorUseCase.execute({
      id: updateAssignorInputParamsDTO.id,
      ...updateAssignorDTO,
    });
  }

  @Delete(':id')
  async remove(
    @Param() removeAssignorInputDTO: RemoveAssignorInputDTO,
  ): Promise<void> {
    return await this.removeAssignorUseCase.execute(removeAssignorInputDTO);
  }
}

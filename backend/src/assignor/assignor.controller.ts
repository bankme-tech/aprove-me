import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAssignorInputDTO } from './dto/create-assignor.input.dto';
import { ICreateAssignorUseCase } from './usecases/create-assignor.usecase.interface';
import { CreateAssignorOutputDTO } from './dto/create-assignor.ouput.dto';
import { IFindAllAssignorsUseCase } from './usecases/find-all-assignors.usecase.interface';
import { FindAssignorOutputDTO } from './dto/find-assignor.output.dto';

@Controller('assignor')
export class AssignorController {
  constructor(
    private readonly createAssignorUseCase: ICreateAssignorUseCase,
    private readonly findAllAssignorsUseCase: IFindAllAssignorsUseCase,
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
}

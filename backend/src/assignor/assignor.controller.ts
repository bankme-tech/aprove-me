import { Body, Controller, Post } from '@nestjs/common';
import { CreateAssignorInputDTO } from './dto/create-assignor.input.dto';
import { ICreateAssignorUseCase } from './usecases/create-assignor.usecase.interface';
import { CreateAssignorOutputDTO } from './dto/create-assignor.ouput.dto';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly createAssignorUseCase: ICreateAssignorUseCase) {}

  @Post()
  async create(
    @Body() createAssignorDTO: CreateAssignorInputDTO,
  ): Promise<CreateAssignorOutputDTO> {
    return await this.createAssignorUseCase.execute(createAssignorDTO);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAssignorDto, UpdateReceivableDto } from 'src/domain/dtos';
import { UUIDParam } from '../../utils/validate-uuid';
import { AuthGuard } from '../guards/auth.guard';
import {
  CreateAssignorUseCase,
  FindAssignorByIdUseCase,
  DeleteAssignorUseCase,
  UpdateAssignorUseCase,
} from './use-cases';

@Controller('assignor')
@UseGuards(AuthGuard)
export class AssignorController {
  constructor(
    private readonly createAssignorUseCase: CreateAssignorUseCase,
    private readonly findAssignorByIdUseCase: FindAssignorByIdUseCase,
    private readonly deleteAssignorUseCase: DeleteAssignorUseCase,
    private readonly updateAssignorUseCase: UpdateAssignorUseCase,
  ) {}

  @Post()
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return await this.createAssignorUseCase.execute(createAssignorDto);
  }

  @Get(':id')
  async findById(@UUIDParam('id') id: string) {
    return await this.findAssignorByIdUseCase.execute(id);
  }

  @Delete(':id')
  async delete(@UUIDParam('id') id: string) {
    return await this.deleteAssignorUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @UUIDParam('id') id: string,
    @Body() updateAssignorDto: UpdateReceivableDto,
  ) {
    return await this.updateAssignorUseCase.execute({
      id,
      ...updateAssignorDto,
    });
  }
}

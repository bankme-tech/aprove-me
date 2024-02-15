import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAssignorDto } from 'src/domain/dtos';
import { CreateAssignorUseCase, FindAssignorByIdUseCase } from './use-cases';
import { UUIDParam } from '../../utils/validate-uuid';
import { DeleteAssignorUseCase } from './use-cases/delete-assignor-usecase';
import { AuthGuard } from '../guards/auth.guard';

@Controller('assignor')
@UseGuards(AuthGuard)
export class AssignorController {
  constructor(
    private readonly createAssignorUseCase: CreateAssignorUseCase,
    private readonly findAssignorByIdUseCase: FindAssignorByIdUseCase,
    private readonly deleteAssignorUseCase: DeleteAssignorUseCase,
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
}

import { UuidDto, uuidDto } from '@/infra/http/dtos/id.dto';
import { AuthGuard } from '@/infra/http/guards/auth.guard';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AssignorsViewModel } from '../view-models/assignors.view-model';
import { FindAssignorByIdUseCase } from '@/modules/integrations/use-cases/find-assignor-by-id.use-case';
import {
  CreateAssignorDto,
  createAssignorDto,
} from '../dtos/create-assignor.dto';
import { CreateAssignorUseCase } from '@/modules/integrations/use-cases/create-assignor.use-case';
import { PatchAssignorDto, patchAssignorDto } from '../dtos/patch-assignor.dto';
import { PatchAssignorUseCase } from '@/modules/integrations/use-cases/patch-assignor.use-case';
import { DeleteAssignorUseCase } from '@/modules/integrations/use-cases/delete-assignor.use-case';

@Controller('integrations/assignors')
export class AssignorsController {
  constructor(
    private findAssignorByIdUseCase: FindAssignorByIdUseCase,
    private createAssignorUseCase: CreateAssignorUseCase,
    private updateAssignorUseCase: PatchAssignorUseCase,
    private deleteAssignorUseCase: DeleteAssignorUseCase,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(AuthGuard)
  public async findAssignorById(
    @Param(new ZodValidationPipe(uuidDto))
    params: UuidDto,
  ) {
    const assignor = await this.findAssignorByIdUseCase.execute(params.id);

    return AssignorsViewModel.toHTTP(assignor);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  public async createAssignor(
    @Body(new ZodValidationPipe(createAssignorDto))
    body: CreateAssignorDto,
  ) {
    const createdAssignor = await this.createAssignorUseCase.execute(body);

    return AssignorsViewModel.toHTTP(createdAssignor);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async partialUpdateAssignor(
    @Param(new ZodValidationPipe(uuidDto)) params: UuidDto,
    @Body(new ZodValidationPipe(patchAssignorDto)) body: PatchAssignorDto,
  ) {
    const updatedAssignor = await this.updateAssignorUseCase.execute({
      id: params.id,
      patchAssignorDto: body,
    });

    return AssignorsViewModel.toHTTP(updatedAssignor);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async deleteAssignor(
    @Param(new ZodValidationPipe(uuidDto)) params: UuidDto,
  ) {
    await this.deleteAssignorUseCase.execute(params.id);
  }
}

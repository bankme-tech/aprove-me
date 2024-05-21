import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreatePayableDto, createPaybleDto } from '../dtos/create-payable.dto';
import { CreatePayableUseCase } from '@/modules/integrations/use-cases/create-payable.use-case';
import { PayablesViewModel } from '../view-models/payables.view-model';
import {
  CreateAssignorDto,
  createAssignorDto,
} from '../dtos/create-assignor.dto';
import { CreateAssignorUseCase } from '@/modules/integrations/use-cases/create-assignor.use-case';
import { AssignorViewModel } from '../view-models/assignor.view-model';

@Controller('/integrations')
export class IntegrationsController {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private createAssignorUseCase: CreateAssignorUseCase,
  ) {}

  @Post('/payables')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createPaybleDto))
  public async createPayable(@Body() createPayableDto: CreatePayableDto) {
    const createdPayable =
      await this.createPayableUseCase.execute(createPayableDto);

    return PayablesViewModel.toHTTP(createdPayable);
  }

  @Post('/assignors')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createAssignorDto))
  public async createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    const createdAssignor =
      await this.createAssignorUseCase.execute(createAssignorDto);

    return AssignorViewModel.toHTTP(createdAssignor);
  }
}

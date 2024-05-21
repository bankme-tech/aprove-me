import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePayableDto, createPayableDto } from '../dtos/create-payable.dto';
import { CreatePayableUseCase } from '@/modules/integrations/use-cases/create-payable.use-case';
import { PayablesViewModel } from '../view-models/payables.view-model';
import { CreateAssignorUseCase } from '@/modules/integrations/use-cases/create-assignor.use-case';
import { AssignorsViewModel } from '../view-models/assignors.view-model';
import { FindPayableByIdUseCase } from '@/modules/integrations/use-cases/find-payable-by-id.use-case';

import { createAssignorDto } from '../dtos/create-assignor.dto';
import type { CreateAssignorDto } from '../dtos/create-assignor.dto';
import { UuidDto, uuidDto } from '@/infra/http/dtos/id.dto';
import { FindAssignorByIdUseCase } from '@/modules/integrations/use-cases/find-assignor-by-id.use-case';

@Controller('/integrations')
export class IntegrationsController {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private createAssignorUseCase: CreateAssignorUseCase,
    private findPayableByIdUseCase: FindPayableByIdUseCase,
    private findAssignorByIdUseCase: FindAssignorByIdUseCase,
  ) {}

  @Post('/payables')
  @HttpCode(HttpStatus.CREATED)
  public async createPayable(
    @Body(new ZodValidationPipe(createPayableDto))
    body: CreatePayableDto,
  ) {
    const createdPayable = await this.createPayableUseCase.execute(body);

    return PayablesViewModel.toHTTP(createdPayable);
  }

  @Post('/assignors')
  @HttpCode(HttpStatus.CREATED)
  public async createAssignor(
    @Body(new ZodValidationPipe(createAssignorDto))
    body: CreateAssignorDto,
  ) {
    const createdAssignor = await this.createAssignorUseCase.execute(body);

    return AssignorsViewModel.toHTTP(createdAssignor);
  }

  @Get('/payables/:id')
  @HttpCode(HttpStatus.FOUND)
  public async findPayableById(
    @Param(new ZodValidationPipe(uuidDto))
    params: UuidDto,
  ) {
    const payable = await this.findPayableByIdUseCase.execute(params.id);

    return PayablesViewModel.toHTTP(payable);
  }

  @Get('/assignors/:id')
  @HttpCode(HttpStatus.FOUND)
  public async findAssignorById(
    @Param(new ZodValidationPipe(uuidDto))
    params: UuidDto,
  ) {
    const assignor = await this.findAssignorByIdUseCase.execute(params.id);

    return AssignorsViewModel.toHTTP(assignor);
  }
}

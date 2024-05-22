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
import { PatchPayableDto, patchPayableDto } from '../dtos/patch-payable.dto';
import { PatchAssignorDto, patchAssignorDto } from '../dtos/patch-assignor.dto';
import { PatchPayableUseCase } from '@/modules/integrations/use-cases/patch-payable.use-case';
import { PatchAssignorUseCase } from '@/modules/integrations/use-cases/patch-assignor.use-case';
import { DeletePayableUseCase } from '@/modules/integrations/use-cases/delete-payable.use-case';
import { DeleteAssignorUseCase } from '@/modules/integrations/use-cases/delete-assignor.use-case';
import { AuthDto, authDto } from '../dtos/auth.dto';
import { AuthUserUseCase } from '@/modules/integrations/use-cases/auth-user.use-case';

@Controller('/integrations')
export class IntegrationsController {
  constructor(
    private createPayableUseCase: CreatePayableUseCase,
    private createAssignorUseCase: CreateAssignorUseCase,
    private findPayableByIdUseCase: FindPayableByIdUseCase,
    private findAssignorByIdUseCase: FindAssignorByIdUseCase,
    private updatePayableUseCase: PatchPayableUseCase,
    private updateAssignorUseCase: PatchAssignorUseCase,
    private deletePayableUseCase: DeletePayableUseCase,
    private deleteAssignorUseCase: DeleteAssignorUseCase,
    private authUserUseCase: AuthUserUseCase,
  ) {}

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

  @Patch('/payables/:id')
  @HttpCode(HttpStatus.OK)
  public async partialUpdatePayable(
    @Param(new ZodValidationPipe(uuidDto)) params: UuidDto,
    @Body(new ZodValidationPipe(patchPayableDto)) body: PatchPayableDto,
  ) {
    const updatedAssignor = await this.updatePayableUseCase.execute({
      id: params.id,
      patchPayableDto: body,
    });

    return PayablesViewModel.toHTTP(updatedAssignor);
  }

  @Patch('/assignors/:id')
  @HttpCode(HttpStatus.OK)
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

  @Delete('/payables/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deletePayable(
    @Param(new ZodValidationPipe(uuidDto)) params: UuidDto,
  ) {
    await this.deletePayableUseCase.execute(params.id);
  }

  @Delete('/assignors/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAssignor(
    @Param(new ZodValidationPipe(uuidDto)) params: UuidDto,
  ) {
    await this.deleteAssignorUseCase.execute(params.id);
  }

  @Post('/auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async auth(@Body(new ZodValidationPipe(authDto)) body: AuthDto) {
    await this.authUserUseCase.execute(body);
  }
}

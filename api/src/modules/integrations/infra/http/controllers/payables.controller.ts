import { UuidDto, uuidDto } from '@/infra/http/dtos/id.dto';
import { AuthGuard } from '@/infra/http/guards/auth.guard';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PayablesViewModel } from '../view-models/payables.view-model';
import { FindPayableByIdUseCase } from '@/modules/integrations/use-cases/find-payable-by-id.use-case';
import { CreatePayableDto, createPayableDto } from '../dtos/create-payable.dto';
import { CreatePayableUseCase } from '@/modules/integrations/use-cases/create-payable.use-case';
import {
  CreatePayablesBatchDto,
  createPayablesBatchDto,
} from '../dtos/create-payables-batch.dto';
import { CreatePayablesBatchUseCase } from '@/modules/integrations/use-cases/create-payables-batch.use-case';
import { PatchPayableDto, patchPayableDto } from '../dtos/patch-payable.dto';
import { PatchPayableUseCase } from '@/modules/integrations/use-cases/patch-payable.use-case';
import { FindAllPayablesUseCase } from '@/modules/integrations/use-cases/find-all-payables.use-case';

@Controller('integrations/payables')
export class PayablesController {
  constructor(
    private findPayableByIdUseCase: FindPayableByIdUseCase,
    private createPayableUseCase: CreatePayableUseCase,
    private createPayablesBatchUseCase: CreatePayablesBatchUseCase,
    private updatePayableUseCase: PatchPayableUseCase,
    private findAllPayablesUseCase: FindAllPayablesUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async findAllPayable() {
    const payables = await this.findAllPayablesUseCase.execute();

    return { payables: payables.map(PayablesViewModel.toHTTP) };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async findPayableById(
    @Param(new ZodValidationPipe(uuidDto))
    params: UuidDto,
  ) {
    const payable = await this.findPayableByIdUseCase.execute(params.id);

    return PayablesViewModel.toHTTP(payable);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  public async createPayable(
    @Body(new ZodValidationPipe(createPayableDto))
    body: CreatePayableDto,
  ) {
    const createdPayable = await this.createPayableUseCase.execute(body);

    return PayablesViewModel.toHTTP(createdPayable);
  }

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async createPayablesBatch(
    @Body(new ZodValidationPipe(createPayablesBatchDto))
    body: CreatePayablesBatchDto,
  ) {
    await this.createPayablesBatchUseCase.execute(body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
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
}

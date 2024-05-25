import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePayableDto } from '../dtos/create-payable.dto';
import { UpdatePayableService } from './../../../../modules/payable/services/update-payable.service';
import { CreatePayableService } from '@modules/payable/services/create-payable.service';
import { ReadPayableService } from '@modules/payable/services/read-payable.service';
import { DeletePayableService } from '@modules/payable/services/delete-payable.service';
import { HttpPayableMapper } from '../mappers/http-payable.mapper';
import { ReadAllPayableService } from '@modules/payable/services/read-all-payable.service';
import { Payable } from '@modules/payable/entities/payable.entity';
import { CreatePayableBatchDto } from '@infra/http/rabbitmq/dtos/create-payable-batch';
import { CreatePayableBatchService } from '@modules/payable/services/create-payable-batch.service';
import { JwtAuthGuard } from '@infra/authentication/guards/jwt-auth.guard';

@Controller('integrations/payable')
@ApiTags('Payable')
@UseGuards(JwtAuthGuard)
export class PayableController {
  constructor(
    private readonly createPayableService: CreatePayableService,
    private readonly readPayableService: ReadPayableService,
    private readonly updatePayableService: UpdatePayableService,
    private readonly deletePayableService: DeletePayableService,
    private readonly readAllPayableService: ReadAllPayableService,
    private readonly createPayableBatchService: CreatePayableBatchService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Payable created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  async create(
    @Param('userId') userId: string,
    @Body() body: CreatePayableDto,
  ) {
    const result = await this.createPayableService.execute(userId, body);

    if (result.isLeft()) {
      return result.value;
    }

    return HttpPayableMapper.toHttp(result.value as Payable);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Payables found.' })
  @ApiResponse({ status: 404, description: 'Payables not found.' })
  async findAll() {
    const result = await this.readAllPayableService.execute();

    if (result.isLeft()) {
      return result.value;
    }

    return result.value.map((payable) => HttpPayableMapper.toHttp(payable));
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Payable found.' })
  @ApiResponse({ status: 404, description: 'Payable not found.' })
  async findById(@Param('id') id: string) {
    const result = await this.readPayableService.execute(id);

    if (result.isLeft()) {
      return result.value;
    }

    return HttpPayableMapper.toHttp(result.value as Payable);
  }

  @Post('batch')
  async createBatch(@Body() createPayableBatchDto: CreatePayableBatchDto) {
    await this.createPayableBatchService.execute(createPayableBatchDto);
    return { message: 'Batch processing started' };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Payable deleted.' })
  @ApiResponse({ status: 404, description: 'Payable not found.' })
  async delete(@Param('id') id: string) {
    const result = await this.deletePayableService.execute(id);

    if (result.isLeft()) {
      return result.value;
    }

    return HttpPayableMapper.toHttp(result.value as Payable);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Payable updated.' })
  @ApiResponse({ status: 404, description: 'Payable not found.' })
  async update(@Param('id') id: string, @Body() body: CreatePayableDto) {
    const result = await this.updatePayableService.execute(id, body);

    if (result.isLeft()) {
      return result.value;
    }

    return HttpPayableMapper.toHttp(result.value as Payable);
  }
}

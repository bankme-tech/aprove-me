import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ListPayableDto } from './dto/list-payable.dto';
import { HttpStatusInterceptor } from '../interceptors/http-status.interceptor';
import { ZodValidationPipe } from 'bme/core/infra/pipes/zod-validation.pipe';
import { createPayableSchema } from 'bme/core/domains/payables/entities/payable.schema';

@Controller('payable')
@ApiTags('Payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create a payable',
    type: CreatePayableDto,
  })
  @UseInterceptors(HttpStatusInterceptor)
  create(
    @Body(new ZodValidationPipe(createPayableSchema))
    createPayableDto: CreatePayableDto,
  ) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list all payables',
    type: ListPayableDto,
    isArray: true,
  })
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get Payable by Id',
    type: CreatePayableDto,
  })
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove payable By Id',
    type: CreatePayableDto,
  })
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}

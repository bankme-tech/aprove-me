import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Queue } from 'bull';
import { Response } from 'express';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableService } from './payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    @InjectQueue('payable') private batchQueue: Queue,
  ) {}

  @Post('/batch')
  @ApiBody({ type: [CreatePayableDto] })
  async createPayableBatch(
    @Body() payableBatch: CreatePayableDto[],
    @Res() res: Response,
  ) {
    const jobs = payableBatch.map((payable) => ({
      name: 'create',
      data: payable,
      attempt: 4,
    }));
    await this.batchQueue.addBulk(jobs);

    return res.sendStatus(201);
  }

  @Get()
  @HttpCode(200)
  async getAllPayables() {
    return this.payableService.findAll();
  }

  @Post()
  @HttpCode(201)
  async createPayable(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get('/:id')
  async findPayableById(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch('/:id')
  updatePayable(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  removePayable(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}

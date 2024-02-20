import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreatePayableBatchDTO } from '@/payable/dtos/payable';
import { IsAuthenticated } from '../guards/auth.guard';
import { PayableProducerWorker } from '@/payable/workers/payable-producer';

@UseGuards(IsAuthenticated)
@Controller('/integrations/payable/batch')
export class CreatePayableBatchController {
  constructor(private payableProducerWorker: PayableProducerWorker) {}

  @Post()
  async handle(@Body() body: CreatePayableBatchDTO, @Res() res: Response) {
    const { data } = body;

    const response = await this.payableProducerWorker.execute(data);

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json();
  }
}

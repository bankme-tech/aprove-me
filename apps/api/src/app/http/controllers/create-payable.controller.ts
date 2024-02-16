import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { CreatePayableDTO } from '@/payable/dtos/payable';
import { CreatePayableUseCase } from '@/payable/use-cases/create-payable';

@Controller('/integrations/payable')
export class CreatePayableController {
  constructor(private createPayable: CreatePayableUseCase) {}

  @Post()
  async handle(@Body() body: CreatePayableDTO, @Res() res: Response) {
    const { assignorId, emissionDate, value } = body;

    const response = await this.createPayable.execute({
      assignorId,
      emissionDate,
      value,
    });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

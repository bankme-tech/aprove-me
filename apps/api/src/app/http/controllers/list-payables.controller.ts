import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ListPayablesUseCase } from '@/payable/use-cases/list-payables';
import { IsAuthenticated } from '../guards/auth.guard';

@UseGuards(IsAuthenticated)
@Controller('/integrations/payable')
export class ListPayablesController {
  constructor(private listPayable: ListPayablesUseCase) {}

  @Get()
  async handle(@Res() res: Response) {
    const response = await this.listPayable.execute();

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

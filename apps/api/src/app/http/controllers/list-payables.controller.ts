import { Response } from 'express';
import { BadRequestException, Controller, Get, Res } from '@nestjs/common';
import { ListPayablesUseCase } from '@/payable/use-cases/list-payables';

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

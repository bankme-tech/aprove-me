import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { GetPayableByIdUseCase } from '@/payable/use-cases/get-payable-by-id';

@Controller('/integrations/payable/:id')
export class GetPayableByIdController {
  constructor(private getPayableById: GetPayableByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string, @Res() res: Response) {
    const response = await this.getPayableById.execute({ id });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

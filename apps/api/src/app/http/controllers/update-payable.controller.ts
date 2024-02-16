import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { UpdatePayableUseCase } from '@/payable/use-cases/update-payable';
import { UpdatePayableDTO } from '@/payable/dtos/payable';

@Controller('/integrations/payable/:id')
export class UpdatePayableController {
  constructor(private updatePayable: UpdatePayableUseCase) {}

  @Put()
  async handle(
    @Param('id') id: string,
    @Body() body: UpdatePayableDTO,
    @Res() res: Response,
  ) {
    const response = await this.updatePayable.execute({ id, ...body });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

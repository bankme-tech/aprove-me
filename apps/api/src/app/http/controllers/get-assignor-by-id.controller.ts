import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { GetAssignorByIdUseCase } from '@/assignor/use-cases/get-assignor-by-id';

@Controller('/integrations/assignor/:id')
export class GetAssignorByIdController {
  constructor(private getAssignorById: GetAssignorByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string, @Res() res: Response) {
    const response = await this.getAssignorById.execute({ id });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

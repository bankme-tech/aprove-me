import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IsAuthenticated } from '../guards/auth.guard';
import { ListAssignorsUseCase } from '@/assignor/use-cases/list-assignors';

@UseGuards(IsAuthenticated)
@Controller('/integrations/assignor')
export class ListAssignorsController {
  constructor(private listAssignors: ListAssignorsUseCase) {}

  @Get()
  async handle(@Res() res: Response) {
    const response = await this.listAssignors.execute();

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

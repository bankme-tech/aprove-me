import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateAssignorDTO } from '@/assignor/dtos/assignor';
import { CreateAssignorUseCase } from '@/assignor/use-cases/create-assignor';
import { IsAuthenticated } from '../guards/auth.guard';

@UseGuards(IsAuthenticated)
@Controller('/integrations/assignor')
export class CreateAssignorController {
  constructor(private createAssignor: CreateAssignorUseCase) {}

  @Post()
  async handle(@Body() body: CreateAssignorDTO, @Res() res: Response) {
    const { document, email, name, phone } = body;

    const response = await this.createAssignor.execute({
      document,
      email,
      name,
      phone,
    });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

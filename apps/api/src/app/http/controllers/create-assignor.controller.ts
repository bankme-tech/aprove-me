import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { CreateAssignorDTO } from '../../assignor/dtos/assignor';
import {
  CreateAssignorUseCase,
  CreateAssignorUseCaseError,
} from '@/assignor/use-cases/create-assignor';

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
      switch (response.value) {
        case CreateAssignorUseCaseError.INVALID_DOCUMENT:
          throw new BadRequestException('Enter a valid document');
        default:
          throw new BadRequestException();
      }
    }

    return res.json(response.value);
  }
}

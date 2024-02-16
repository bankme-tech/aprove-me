import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { UpdateAssignorDTO } from '@/assignor/dtos/assignor';
import { UpdateAssignorUseCase } from '@/assignor/use-cases/update-assignor';

@Controller('/integrations/assignor/:id')
export class UpdateAssignorController {
  constructor(private updateAssignor: UpdateAssignorUseCase) {}

  @Put()
  async handle(
    @Param('id') id: string,
    @Body() body: UpdateAssignorDTO,
    @Res() res: Response,
  ) {
    const response = await this.updateAssignor.execute({ id, ...body });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.json(response.value);
  }
}

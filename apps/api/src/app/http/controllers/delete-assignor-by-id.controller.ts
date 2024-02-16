import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { DeleteAssignorUseCase } from '@/assignor/use-cases/delete-assignor';

@Controller('/integrations/assignor/:id')
export class DeleteAssignorByIdController {
  constructor(private deleteAssignor: DeleteAssignorUseCase) {}

  @Delete()
  async handle(@Param('id') id: string, @Res() res: Response) {
    const response = await this.deleteAssignor.execute({ id });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.status(HttpStatus.OK).json();
  }
}

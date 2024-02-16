import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { DeletePayableUseCase } from '@/payable/use-cases/delete-payable';

@Controller('/integrations/payable/:id')
export class DeletePayableByIdController {
  constructor(private deletePayable: DeletePayableUseCase) {}

  @Delete()
  async handle(@Param('id') id: string, @Res() res: Response) {
    const response = await this.deletePayable.execute({ id });

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    return res.status(HttpStatus.OK).json();
  }
}

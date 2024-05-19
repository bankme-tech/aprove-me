import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePayableDTO } from '@/infra/http/dto/payable/create-payable.dto';
import { AddNewPayable } from '@/app/use-cases/payable/add-new-payable';
import { ParamId } from '@/utils/param-id';
import { FindPayableById } from '@/app/use-cases/payable/find-payable-by-id';

@Controller('payable')
export class PayableController {
  constructor(
    private addNewPayable: AddNewPayable,
    private findPayableById: FindPayableById,
  ) { }

  @Post()
  async create(@Body() body: CreatePayableDTO) {
    const { newPayable } = await this.addNewPayable.execute(body);
    return newPayable;
  }

  @Get(':payableId')
  async findById(@ParamId('payableId') payableId: string) {
    const { payable } = await this.findPayableById.execute({ payableId });

    return payable;
  }
}

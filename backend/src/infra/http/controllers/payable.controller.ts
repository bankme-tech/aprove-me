import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePayableDTO } from '@/infra/http/dto/payable/create-payable.dto';
import { AddNewPayable } from '@/app/use-cases/payable/add-new-payable';
import { ParamId } from '@/utils/param-id';
import { FindPayableById } from '@/app/use-cases/payable/find-payable-by-id';
import { EditPayableDTO } from '@/infra/http/dto/payable/edit-payable.dto';
import { EditPayable } from '@/app/use-cases/payable/edit-payable';
import { DeletePayable } from '@/app/use-cases/payable/delete-payable';
import { FindAll } from '@/app/use-cases/payable/find-all';
import { FindAllDTO } from '../dto/payable/find-all.dto';

@Controller('payable')
export class PayableController {
  constructor(
    private addNewPayable: AddNewPayable,
    private findPayableById: FindPayableById,
    private findAll: FindAll,
    private editPayable: EditPayable,
    private deletePayable: DeletePayable,
  ) {}

  @Post()
  async create(@Body() body: CreatePayableDTO) {
    const { newPayable } = await this.addNewPayable.execute(body);
    return newPayable;
  }

  @Get()
  async findAllPayables(@Query() query: FindAllDTO) {
    const { payables, totalPages, totalPayables } =
      await this.findAll.execute(query);

    return { payables, totalPages, totalPayables };
  }

  @Get(':payableId')
  async findById(@ParamId('payableId') payableId: string) {
    const { payable } = await this.findPayableById.execute({ payableId });

    return payable;
  }

  @Put(':payableId')
  async edit(
    @ParamId('payableId') payableId: string,
    @Body() body: EditPayableDTO,
  ) {
    const { payable } = await this.editPayable.execute({
      ...body,
      payableId,
    });

    return payable;
  }

  @Delete(':payableId')
  async delete(@ParamId('payableId') payableId: string) {
    await this.deletePayable.execute({ payableId });
  }
}

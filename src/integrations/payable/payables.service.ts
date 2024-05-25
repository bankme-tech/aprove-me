import { PayableDto } from './dto/create-payable';
import * as PayableModel from './model/payableModel'
import { deletePayable } from './model/payableModel';
export class PayableService {

  async create(payable: PayableDto): Promise<PayableDto> {
    return  await PayableModel.add(payable)
  }

  async findOne(id: string): Promise<PayableDto> {
    return await PayableModel.findOne(id)
  }

  async update(id, payable: PayableDto): Promise<PayableDto> {
    return  await PayableModel.update(id, payable)
  }

  async delete(id: string): Promise<PayableDto> {
    return await PayableModel.deletePayable(id)
  }
}
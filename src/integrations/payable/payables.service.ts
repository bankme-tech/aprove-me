import { PayableDto } from './dto/create-payable';
import * as PayableModel from './model/payableModel'
export class PayableService {

  async create(payable: PayableDto): Promise<PayableDto> {
    return  await PayableModel.add(payable)
  }
}
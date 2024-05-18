import { Injectable } from '@nestjs/common';
import Payable from '../entity/Payable';
import PayableRepository from './payable.repository';
import { IPayable } from '../types/IPayables';

@Injectable()
export class PayableService {
  constructor(private payableRepository: PayableRepository) {}

  async createPayableRegister(payable: Payable): Promise<IPayable> {
    const createdPayable =
      await this.payableRepository.createPayableRegister(payable);

    return createdPayable;
  }

  async findPayableById(id: string) {
    const payable = await this.payableRepository.findPayableById(id);

    return payable;
  }
}

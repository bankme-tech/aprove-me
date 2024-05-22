import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Payable from '../entity/Payable';
import PayableRepository from './payable.repository';
import { IPayable } from '../types/IPayables';
import PayableDto from '../dto/PayableDto';

@Injectable()
export class PayableService {
  constructor(private payableRepository: PayableRepository) {}

  async createPayableRegister(payable: Payable): Promise<IPayable> {
    const createdPayable =
      await this.payableRepository.createPayableRegister(payable);

    return PayableDto.fromEntity(createdPayable);
  }

  async findPayableById(id: string) {
    const payable = await this.payableRepository.findPayableById(id);

    if (!payable) {
      throw new HttpException('Payable not found', HttpStatus.NOT_FOUND);
    }

    return PayableDto.fromEntity(payable);
  }

  async updatePayableById(id: string, payable: Payable) {
    const updatedPayable = await this.payableRepository.updatePayableById(
      id,
      payable,
    );

    if (!updatedPayable) {
      throw new HttpException('Payable not found', HttpStatus.NOT_FOUND);
    }

    return PayableDto.fromEntity(updatedPayable);
  }

  async deletePayableById(id: string) {
    const payable = await this.payableRepository.deletePayableById(id);

    if (!payable) {
      throw new HttpException('Payable not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}

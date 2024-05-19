import { Inject, Injectable } from '@nestjs/common';
import { PayableRepository } from '../repositories/payable.repository';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';

@Injectable()
export class PayableService {
  constructor(
    @Inject('PayableRepository')
    private readonly payableRepository: PayableRepository,
  ) {}

  async createPayable(payable: CreatePayableDto) {
    return this.payableRepository.create(payable);
  }

  async findById(id: string) {
    return this.payableRepository.findById(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PayableRepository } from '../repositories/payable.repository';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';
import { Payable } from '../entities/payable.entity';

@Injectable()
export class PayableService {
  constructor(
    @Inject('PayableRepository')
    private readonly payableRepository: PayableRepository,
  ) {}

  async findAll() {
    return this.payableRepository.findAll();
  }

  async createPayable(payable: CreatePayableDto) {
    return this.payableRepository.create(payable);
  }

  async findById(id: string) {
    return this.payableRepository.findById(id);
  }

  async update(id: string, payable: Payable) {
    return this.payableRepository.update(id, payable);
  }

  async delete(id: string) {
    return this.payableRepository.delete(id);
  }
}

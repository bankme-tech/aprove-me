import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import PayableRepository from './repositories/payableRepository';

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async create(createPayableDto: CreatePayableDto) {
    return this.payableRepository.create(createPayableDto);
  }

  async findAll() {
    return this.payableRepository.findAll();
  }

  async findOne(id: string) {
    const payable = await this.payableRepository.findOne(id);
    if (!payable) {
      throw new HttpException('Payable not found', HttpStatus.NOT_FOUND);
    }

    return payable;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    const updated = await this.payableRepository.update(id, updatePayableDto);
    if (!updated) {
      throw new HttpException('Payable not found', HttpStatus.NOT_FOUND);
    }

    return updated;
  }

  remove(id: string) {
    return `This action removes a #${id} payable`;
  }
}

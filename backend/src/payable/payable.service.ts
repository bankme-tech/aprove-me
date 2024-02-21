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

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}

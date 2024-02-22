import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import PayableRepository from './repositories/payableRepository';
import AssignorRepository from '../assignor/repositories/assignorRepository';

@Injectable()
export class PayableService {
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository,
  ) {}

  async create(createPayableDto: CreatePayableDto) {
    const assignor = await this.assignorRepository.findOne(createPayableDto.assignorId);
    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

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
    return this.payableRepository.update(id, updatePayableDto);
  }

  async remove(id: string) {
    return this.payableRepository.delete(id);
  }
}

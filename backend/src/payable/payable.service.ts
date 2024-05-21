import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  create(createPayableDto: CreatePayableDto) {
    return {
      id: randomUUID(),
      ...createPayableDto,
    };
  }

  findAll() {
    return `This action returns all payable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payable`;
  }

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}

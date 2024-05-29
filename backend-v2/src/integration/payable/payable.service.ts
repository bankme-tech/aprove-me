import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  create(createPayableDto: CreatePayableDto) {
    return 'This action adds a new payable';
  }

  findAll() {
    return `This action returns all payable`;
  }

  findOne(id: string) {
    return `This action returns a #${id} payable`;
  }

  update(id: string, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: string) {
    return `This action removes a #${id} payable`;
  }
}

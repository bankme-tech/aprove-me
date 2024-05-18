import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './create-payable.dto';

@Injectable()
export class PayableService {
  create(createPayableDto: CreatePayableDto) {
    return createPayableDto;
  }
}

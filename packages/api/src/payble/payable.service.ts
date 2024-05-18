import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableRepository } from './repositories/payable-repository';
import { AssignorRepository } from '@assignor/repositories/assignor-repository';

@Injectable()
export class PayableService {
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository,
  ) {}

  async create(createPayableDto: CreatePayableDto) {
    return this.payableRepository.create(createPayableDto);
  }
}

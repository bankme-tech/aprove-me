import { Injectable, NotFoundException } from '@nestjs/common';
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
    const assignor = await this.assignorRepository.findById(createPayableDto.assignorId);
    if (!assignor) {
      throw new NotFoundException('assignor not found');
    }

    return this.payableRepository.create(createPayableDto);
  }
}
